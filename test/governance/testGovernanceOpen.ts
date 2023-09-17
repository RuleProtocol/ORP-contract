// @ts-nocheck
import {
    ClusterArea,
    ClusterHandlerArea,
    ClusterRuleArea,
    ClusterRuleAreaHandler,
    ClusterRuleAreaUtil,
    ERC1155MinterSupplyCap,
    ERC20FixedSupplyCap,
    ERC20MinterPauserBurnerCapVote,
    ERC721MinterPauserAutoIdCap,
    GovernorCheck,
    GovernorContract,
    GovernorContract__factory, GovHandler, PoolContract,
    PoolToken,
    ProxyIntakeAdmin,
    TimeLock,
    Transfer
} from "../../typechain";
import * as chainHub from "../../src/v3/util/Chain";
import * as util from "../../src/v3/util/Util";

import {
    Cluster,
    DURATION_TYPE,
    FULL_POOL_TOKEN_ROLES,
    GroupSlot,
    HANDLER_STATE,
    RLP,
    Rule,
    RuleSlot,
    SELF_ADDRESS,
    TokenSlot,
    TRANSFER_ROLE,
    ZERO_ADDRESS,
    TokenTemplate as TT,
    Token,
    PROPOSAL_ROLE,
    EXECUTOR_ROLE,
    CANCEL_ROLE,
    PROPOSAL_STATE,
    MINTER_ROLE,
    MINT_DESTROY_ADDRESS, BYTES0,
} from "../../src";

import {ethers} from "hardhat";
import {Contract} from "../../src/chain/contract";
import networkConfig from "../../networks";
import {BytesLike, Signer, utils} from "ethers";


let poolTokenInputOwner:PoolToken;

let proxyIntakeAdmin;
let clusterAreaProxy:ClusterArea;
let clusterHandlerAreaProxy:ClusterHandlerArea;
let clusterRuleAreaProxy:ClusterRuleArea;
let poolContract;
let govHandlerProxy;

let governorProxy: GovernorContract
let governorCheck:GovernorCheck
let timeLock;

let erc20Token: ERC20FixedSupplyCap;
let erc1155Token: ERC1155MinterSupplyCap;
let erc721Token: ERC721MinterPauserAutoIdCap;
let governanceToken;

let folder = "2023-06-20";

let BN = util.Util.BN;

let owner, user, admin: Signer;
let user1, user2, user3, user4, user5, user6, user7, user8;


let overrides = {
    gasLimit: 12000000
}

const proposalNormalBranch = BN(1);
const voteNormalBranch = BN(2);
const proposalAuditBranch = BN(3);
const voteAuditBranch = BN(4);
const voteNormalMode = BN(1);
const voteFairMode = BN(2);

let clusterId = BN(1);

let ruleSlotIndexInput = BN(0);
let ruleSlotIndexOutput = BN(1);
let E18 = util.Util.E18;
let D18 = util.Util.D18;

let hubChain: chainHub.Chain;

setTimeout(function () {
    testGovernance();
}, 50);

let testGovernance = async function () {
    await initEnv();
    await deployGovHandler()
    await deployToken();
    await deployQualification();
    await deployGovernance();

    await dealGovernanceToken();
    await dealTimeLock();
    await dealTarget();

    await testProposalUnfair()

}

let initEnv = async function () {
    console.log("----------------------- init env -------------------------");
    [user1, user2, user3, user4, user5, user6, user7, user8] = await ethers.getSigners();
    var url = networkConfig.networks[networkConfig.defaultNetwork].url;
    hubChain = new chainHub.Chain(url, await ethers.getSigners());

}


let deployGovHandler = async function () {

    console.log("----------------------- deployGovHandler -------------------------");

    [owner, user, admin] = await ethers.getSigners();

    var url = networkConfig.networks[networkConfig.defaultNetwork].url;
    hubChain = new chainHub.Chain(url,await ethers.getSigners());

    await hubChain.balance(owner.address,{name:"owner"});

    await deployHandlerEnv(owner,folder);

    govHandlerProxy=<GovHandler>await Contract.deployProxy("GovHandler", owner, [], { folder: folder, override: true },proxyIntakeAdmin.address);

    let tx = await clusterHandlerAreaProxy.add("Gov", "Gov", govHandlerProxy.address, overrides);
    await tx.wait();
    tx = await clusterHandlerAreaProxy.updateState(govHandlerProxy.address, HANDLER_STATE.ACCEPTED);
    let state = await clusterHandlerAreaProxy.get(govHandlerProxy.address);

}

let deployQualification = async function () {

    console.log("----------------------- deployQualification -------------------------");

    let tokenSlot1155:TokenSlot = new TokenSlot(TT.newERC1155Range(erc1155Token.address,BN(1),BN(1),E18(10),E18(10)));
    tokenSlot1155.addBranchTimestamp(SELF_ADDRESS,0);

    let groupSlot1:GroupSlot = new GroupSlot(poolTokenInputOwner.address,1);
    groupSlot1.addArgs(govHandlerProxy.address,[RLP.to("votingSucceedFactor",5000),RLP.to("quorum",500),RLP.to("oneVotePerAddressQuorum",3)]);

    groupSlot1.addTokenSlot(tokenSlot1155);

    let tokenSlot20:TokenSlot = new TokenSlot(TT.newERC20(erc20Token.address,E18(5),E18(5)));
    tokenSlot20.addBranchTimestamp(SELF_ADDRESS,0);

    let groupSlot2:GroupSlot = new GroupSlot(poolTokenInputOwner.address,2);
    groupSlot2.addTokenSlot(tokenSlot20);

    let groupSlot3:GroupSlot = new GroupSlot(poolTokenInputOwner.address,3);

    let cluster:Cluster = new Cluster(owner.address,owner.address,"",0,0);//duration Begin delay
    cluster.addRuleSlot(new RuleSlot(0,[groupSlot1,groupSlot2]));
    cluster.addRuleSlot(new RuleSlot(1,[groupSlot3]));

    let rule:Rule = new Rule(0,1,100,DURATION_TYPE.TIMESTAMP,0,0);

    rule.addProcessHandler(clusterHandlerAreaProxy.address,govHandlerProxy.address, []);

    cluster.addRule(rule);

    await cluster.init();
    let tx = await clusterAreaProxy.connect(owner).regRule(cluster, overrides);
    let receipt = await tx.wait();

    let eventClusterList = await hubChain.decodeEvent(clusterAreaProxy, receipt, "EventCluster");
    let eventCluster = eventClusterList[eventClusterList.length - 1];

    let clusterId = eventCluster.eventLog.clusterId;
    console.log("clusterId",clusterId);
}

let deployToken = async function (){

    console.log("--------------------- deploy Token Pool ---------------------------");

    let overrides = {
        gasLimit: 8000000
    };
    let proxyIntakeAdmin = <ProxyIntakeAdmin>await Contract.deploy("ProxyIntakeAdmin", owner, [overrides], { folder: folder, saveName: "PoolToken" });

    let poolTokenAllocationOwner = <PoolTokenAllocation>await Contract.deployProxy("PoolTokenAllocation", owner, [overrides], { folder: folder, saveName: "inputOwner" }, proxyIntakeAdmin.address, null, false);
    poolTokenInputOwner = <PoolToken>await Contract.deployProxy("PoolToken", owner, [FULL_POOL_TOKEN_ROLES, poolTokenAllocationOwner.address, "PoolToken", "PT", overrides], { folder: folder, saveName: "inputOwner" }, proxyIntakeAdmin.address);

    console.log("--------------------- deploy ERC ---------------------------");

    erc20Token = <ERC20FixedSupplyCap> await Contract.deploy("ERC20FixedSupplyCap", owner, [
            "in20", "in20",
            ethers.utils.parseEther("10000000000"),
            ethers.utils.parseEther("1000000000000"),
            owner.address,
            ZERO_ADDRESS,
            overrides],
        {name: "erc20-token",folder:folder,saveName:"token-1"});

    await erc20Token.transfer(user.address,E18(1000000));
    await erc20Token.transfer(owner.address,E18(1000000));
    await erc20Token.transfer(poolTokenInputOwner.address,E18(1000000));

    await erc20Token.transfer(user2.address,E18(1000));
    await erc20Token.transfer(user3.address,E18(1000));
    await erc20Token.transfer(user4.address,E18(1000));
    await erc20Token.transfer(user5.address,E18(1000));


    erc1155Token = <ERC1155MinterSupplyCap> await Contract.deploy("ERC1155MinterSupplyCap",owner,
        ["0x",ZERO_ADDRESS,overrides],
        {name:"erc1155-token",folder:folder,saveName:"token-1"});

    await erc1155Token.addCap(BN(1),E18(100000));
    await erc1155Token.addCap(BN(2),E18(100000));
    await erc1155Token.mint(user.address,BN(1),E18(5000),"0x");
    await erc1155Token.mint(user1.address,BN(1),E18(5000),"0x");
    await erc1155Token.mint(owner.address,BN(1),E18(5000),"0x");
    await erc1155Token.mint(owner.address,BN(2),E18(5000),"0x");
    await erc1155Token.mint(user.address,BN(2),E18(5000),"0x");
    console.log("----erc1155 user id-1 : ",utils.formatEther(await erc1155Token.balanceOf(user.address,BN(1))));


    erc721Token = <ERC721MinterPauserAutoIdCap> await Contract.deploy("ERC721MinterPauserAutoIdCap",owner,
        ["ERC721","ERC721","",1000000,ZERO_ADDRESS,overrides],
        {name:"erc721-token",folder:folder,saveName:"token-1"});

    await erc721Token.claim(1,owner.address);
    await erc721Token.claim(2,owner.address);
    await erc721Token.claim(3,owner.address);

    await hubChain.balance(owner.address,{name:"owner"});

    await erc20Token.grantRole(MINTER_ROLE,poolTokenInputOwner.address);
    await erc1155Token.grantRole(MINTER_ROLE,poolTokenInputOwner.address);
    await erc721Token.grantRole(MINTER_ROLE,poolTokenInputOwner.address);


    await poolContract.regDeployer(owner.address,BN(erc20Token.deployTransaction.nonce));
    await poolContract.regDeployer(owner.address,BN(erc1155Token.deployTransaction.nonce));
    await poolContract.regDeployer(owner.address,erc721Token.deployTransaction.nonce);

}


let deployGovernance = async function () {

    console.log("----------------------- deployGovernance -------------------------");

    governanceToken = <ERC20MinterPauserBurnerCapVote>await Contract.deploy("ERC20MinterPauserBurnerCapVote", user1, ["comp", "comp", BN(1000000)], overrides)

    timeLock = <TimeLock>await Contract.deploy("TimeLock", user1, [10, [user1.address], [user1.address], user1.address], overrides);

    let transferUtil = <Transfer>await Contract.deploy("Transfer", user1, [], overrides);


    governorCheck = await Contract.deployWithLib("GovernorCheck",{
        "contracts/V3/util/Transfer.sol:Transfer": transferUtil.address,
    },owner,[],{saveName:"GovernorCheck",folder:folder})


    let proxyIntakeGovernor = await Contract.deployProxyWithLib("GovernorContract",
    {
        "contracts/governance/GovernorCheck.sol:GovernorCheck": governorCheck.address
    },user1,[
        "governor contract",
        MINT_DESTROY_ADDRESS,// governance token
        timeLock.address,
            {
            clusterRuleAreaAddress: clusterRuleAreaProxy.address,
            clusterId: clusterId,
            ruleSlotIndexInput: ruleSlotIndexInput,
            ruleSlotIndexOutput: ruleSlotIndexOutput,
            govHandlerAddress: govHandlerProxy.address
        }, {
            initialVotingDelay: 20,
            initialVotingPeriod: 40,
            updateVotingDelayMin: 20,
            updateVotingPeriodMin: 40,
        },overrides],{saveName:"GovernorContract"},proxyIntakeAdmin.address,null)


    governorProxy=GovernorContract__factory.connect(proxyIntakeGovernor.address,user1);

    let osParams = await governorProxy.getParams()
    console.log("system params: " + JSON.stringify(osParams))
}

let dealGovernanceToken = async function () {

    console.log("----------------------- dealGovernanceToken -------------------------");

    await governanceToken.connect(user1).mint(user1.address, BN(10));
    await governanceToken.connect(user1).mint(user2.address, BN(15));
    await governanceToken.connect(user1).mint(user3.address, BN(20));
    await governanceToken.connect(user1).mint(user4.address, BN(25));
    await governanceToken.connect(user1).mint(user5.address, BN(30));
    await governanceToken.connect(user1).delegate(user1.address);
    await governanceToken.connect(user2).delegate(user2.address);
    await governanceToken.connect(user3).delegate(user3.address);
    await governanceToken.connect(user4).delegate(user4.address);
    await governanceToken.connect(user5).delegate(user5.address);
}

let dealTimeLock = async function () {

    console.log("----------------------- dealTimeLock -------------------------");

    await timeLock.grantRole(PROPOSAL_ROLE, governorProxy.address);
    await timeLock.grantRole(EXECUTOR_ROLE, governorProxy.address);
    await timeLock.grantRole(CANCEL_ROLE,governorProxy.address);

}
let dealTarget = async function () {

    console.log("----------------------- dealTarget -------------------------");

    await erc20Token.grantRole(MINTER_ROLE, timeLock.address)
    await poolTokenInputOwner.grantRole(MINTER_ROLE, timeLock.address)
}


let testProposalUnfair = async function () {

    console.log("----------------------- testProposalUnfair -------------------------");

    let startBalance = await erc20Token.balanceOf(user3.address);
    console.log("--- user3 erc20 balance " + D18(startBalance))


    console.log("--- make code : mint20 from Token Pool ");

    let proposalDesc = "mint for user3 from Token Pool";

    let poolTokenMintData = getPoolToken20MintCallData(erc20Token.address,0,user3.address,E18(500));

    let proposalId = await governorProxy.hashProposal(
        [poolTokenInputOwner.address],
        [BN(0)],
        [poolTokenMintData],
        getStrHash(proposalDesc));

    console.log("--- proposalId : " +proposalId+"");


    let e1155Token = Token.newERC1155(erc1155Token.address,1,E18(10));
    let inTokenListForProposal = [
        e1155Token
    ]

    console.log("--- make Propose -------------------------");

    let txGov = await governorProxy.connect(user1).proposeWithType(
        [poolTokenInputOwner.address],
        [BN(0)],
        [poolTokenMintData],
        proposalDesc,
        inTokenListForProposal,
        proposalNormalBranch,
        voteFairMode);
    console.log("gov hash",txGov.hash);
    await txGov.wait()
    console.log(Number(await governorProxy.state(proposalId)))

    await printProposal(proposalId)

    console.log("--- waiting to vote");

    await moveBlocks(21)

    console.log("--- start to vote");

    console.log(user1.address)
    console.log(await governorProxy.state(proposalId))


    console.log("--- build qualification");

    let e20Token = Token.newERC20(erc20Token.address,E18(5));
    let inTokenListForVote = [
        e20Token
    ]

    let tx = await governorProxy.connect(user1).castVoteWithReasonParamsAndType(proposalId, BN(0), "no reason", BYTES0, inTokenListForVote,overrides)
    let receipt = await tx.wait();
    console.log("-- user1 vote hash:",tx.hash)


    tx = await governorProxy.connect(user2).castVoteWithReasonParamsAndType(proposalId, BN(0), "no reason", BYTES0, inTokenListForVote)
    receipt = await tx.wait();
    console.log("-- user2 vote hash:",tx.hash)

    tx = await governorProxy.connect(user3).castVoteWithReasonParamsAndType(proposalId, BN(1), "no reason", BYTES0, inTokenListForVote)
    receipt = await tx.wait();
    console.log("-- user3 vote hash:",tx.hash)

    tx = await governorProxy.connect(user4).castVoteWithReasonParamsAndType(proposalId, BN(1), "no reason", BYTES0, inTokenListForVote)
    receipt = await tx.wait();
    console.log("-- user4 vote hash:",tx.hash)

    tx = await governorProxy.connect(user5).castVoteWithReasonParamsAndType(proposalId, BN(1), "no reason", BYTES0, inTokenListForVote)
    receipt = await tx.wait();
    console.log("-- user5 vote hash:",tx.hash)

    // console.log("castVoteWithReasonParamsAndType gasUsed", receipt.gasUsed.toNumber())
    // console.log("castVoteWithReasonParamsAndType gasPrice", receipt.effectiveGasPrice.toNumber())

    await printVoteCondition(proposalId)

    await moveBlocks(40);

    let state = await governorProxy.connect(user1).state(proposalId)
    console.log("proposal state:" + state);
    if (state != PROPOSAL_STATE.Succeeded) {
        return;
    }

    await governorProxy.connect(user1).queue([poolTokenInputOwner.address], [BN(0)], [poolTokenMintData], getStrHash(proposalDesc));

    console.log("-- unlock time " + await governorProxy.proposalEta(proposalId))
    await sleep(10000)
    await moveBlocks(1)
    console.log("-- now block time" + await hubChain.getLatestBlockTimestamp(user1))

    console.log("--- execute propose -------------------------");

    await governorProxy.connect(user1).execute([poolTokenInputOwner.address], [BN(0)], [poolTokenMintData], getStrHash(proposalDesc));

    let endBalance = await erc20Token.balanceOf(user3.address);
    console.log("--- user3 erc20 balance " + D18(endBalance))
    console.log("--- user3 erc20 balance delta " + D18(endBalance.sub(startBalance)))

}


let printVoteCondition = async function (proposalId) {
    let votesCondition = await governorProxy.proposalVotes(proposalId)
    console.log("against votes" + Number(votesCondition[0]))
    console.log("for votes" + Number(votesCondition[1]))
    console.log("abstain votes" + Number(votesCondition[2]))
}




export async function deployHandlerEnv(deployer: Signer, folder?: string = undefined, override?: boolean = true) {

    console.log("----------------------- deployHandlerEnv -------------------------");

    let overrides = { gasLimit: 10000000,gasPrice: 1500000000};
    proxyIntakeAdmin = <ProxyIntakeAdmin>await Contract.deploy("ProxyIntakeAdmin", deployer, [overrides], { folder: folder, override: override });

    poolContract = <PoolContract>await Contract.deploy("PoolContract", deployer, [overrides], { folder: folder, override: override });
    clusterHandlerAreaProxy = <ClusterHandlerArea>await Contract.deployProxy("ClusterHandlerArea", deployer, [overrides], { folder: folder, override: override }, proxyIntakeAdmin.address);

    let poolGasProxy = <PoolGas>await Contract.deployProxy("PoolGas", deployer, [ZERO_ADDRESS, clusterHandlerAreaProxy.address, overrides], { folder: folder, override: override }, proxyIntakeAdmin.address);

    let clusterRuleAreaUtil = <ClusterRuleAreaUtil>await Contract.deploy("ClusterRuleAreaUtil", deployer, [overrides], { folder: folder, override: override });
    let clusterRuleAreaProcess = <ClusterRuleAreaProcess>await Contract.deploy("ClusterRuleAreaProcess", deployer, [overrides], { folder: folder, override: override });

    clusterAreaProxy = <ClusterArea>await Contract.deployProxyWithLib(
        "ClusterArea",
        {
            "contracts/V3/ClusterRuleAreaProcess.sol:ClusterRuleAreaProcess": clusterRuleAreaProcess.address
        }, deployer, [overrides], {
            folder: folder,
            override: override
        }, proxyIntakeAdmin.address, null, false);

    clusterRuleAreaProxy = <ProxyIntake>await Contract.deployProxyWithLib(
        "ClusterRuleArea",
        {
            "contracts/V3/ClusterRuleAreaUtil.sol:ClusterRuleAreaUtil": clusterRuleAreaUtil.address,
            "contracts/V3/ClusterRuleAreaProcess.sol:ClusterRuleAreaProcess": clusterRuleAreaProcess.address
        }, deployer, [clusterAreaProxy.address, poolContract.address, poolGasProxy.address, ZERO_ADDRESS, overrides], {
            folder: folder,
            override: override
        }, proxyIntakeAdmin.address);

    let clusterRuleAreaHandlerProxy = <ClusterRuleAreaHandler>await Contract.deployProxyWithLib(
        "ClusterRuleAreaHandler",
        {
            "contracts/V3/ClusterRuleAreaProcess.sol:ClusterRuleAreaProcess": clusterRuleAreaProcess.address
        }, deployer, [clusterAreaProxy.address, poolContract.address, poolGasProxy.address, ZERO_ADDRESS, overrides], {
            folder: folder,
            override: override
        }, proxyIntakeAdmin.address);

    let clusterAttributeAreaProxy = <ClusterAttributeArea>await Contract.deployProxy("ClusterAttributeArea", deployer, [clusterAreaProxy.address, poolContract.address, ZERO_ADDRESS, overrides], { folder: folder, override: override }, proxyIntakeAdmin.address);
    let clusterAttributeAreaTokenProxy = <ClusterAttributeAreaToken>await Contract.deployProxy("ClusterAttributeAreaToken", deployer, [clusterAreaProxy.address, poolContract.address, ZERO_ADDRESS, clusterAttributeAreaProxy.address, overrides], { folder: folder, override: override }, proxyIntakeAdmin.address);
    let clusterMountingAreaProxy = <ClusterMountingArea>await Contract.deployProxy("ClusterMountingArea", deployer, [clusterAreaProxy.address, poolContract.address, ZERO_ADDRESS, overrides], { folder: folder, override: override }, proxyIntakeAdmin.address);

    let tx = await clusterAreaProxy.initialize(poolContract.address, ZERO_ADDRESS, poolGasProxy.address, clusterRuleAreaProxy.address, clusterRuleAreaHandlerProxy.address, clusterAttributeAreaProxy.address, clusterAttributeAreaTokenProxy.address, clusterMountingAreaProxy.address);
    await tx.wait();


    console.log();
    console.log(proxyIntakeAdmin.address, "(proxyIntakeAdmin address)");
    console.log(clusterHandlerAreaProxy.address, "(clusterHandlerAreaProxy address)");
    console.log(clusterAreaProxy.address, "(clusterAreaProxy address)");
    console.log(clusterRuleAreaProxy.address, "(clusterRuleAreaProxy address)");
    console.log(clusterRuleAreaHandlerProxy.address, "(clusterRuleAreaHandlerProxy address)");
    console.log(poolContract.address, "(poolContract address)");
    console.log();
}


let printProposal = async function (proposalId) {
    let proposal = await governorProxy._proposals(proposalId);
    console.log(JSON.stringify(proposal))
}


let sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

let getStrHash = function (str: string) {
    return utils.keccak256(utils.toUtf8Bytes(str))
}


async function moveBlocks(amount: number) {
    console.log("Moving blocks...")

    await waitBlock(user1, amount);
    console.log(`Moved ${amount} blocks`)
}


async function waitBlock(address: string | Signer = undefined, blockCount: number = 3) {
    let blockStart = await hubChain.getLatestBlockHeight(user1);
    let beginTime = new Date().getTime();
    while (true) {
        let nowTime = new Date().getTime();
        let intervalTime = nowTime - beginTime;
        if (intervalTime > 1000) {
            beginTime = nowTime;
        } else {
            continue;
        }

        if (address != undefined) {
            for (let i = 0; i <= blockCount; ++i) {
                await hubChain.sendTx(user1, user2, 0.000001);
            }
        }

        let blockEnd = await hubChain.getLatestBlockHeight(user1);
        let interval = blockEnd - blockStart;

        if (interval > 3) {
            break;
        }
    }
}


function getMintFunctionCallData(to: string, amount: BigInteger) {
    let ABI = ["function mint(address to, uint amount)"];
    let iface = new ethers.utils.Interface(ABI);
    let data = iface.encodeFunctionData("mint", [to, amount]);
    console.log(data);
    return data;
}

function getPoolToken721ClaimCallData(erc721:string,allocateId:number,to:address,id:number){
    let ABI = ["function ERC721Claim(address,uint16,uint256,address)"];
    let iface = new ethers.utils.Interface(ABI);
    let data = iface.encodeFunctionData("ERC721Claim", [erc721,allocateId, id,to]);
    console.log(data);
    return data;
}

function getPoolToken20MintCallData(erc20:string,allocateId:number,to:address,amount:BigNumberish){
    let ABI = ["function ERC20Mint(address, uint16, address,uint256)"];
    let iface = new ethers.utils.Interface(ABI);
    let data = iface.encodeFunctionData("ERC20Mint", [erc20,allocateId,to,amount]);
    console.log(data);
    return data;
}
