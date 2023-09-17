// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Governor.sol";
import "./GovernorCountingSimple.sol";
import "./GovernorVotes.sol";
import "./GovernorTimelockControl.sol";
import "./GovernorSettings.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "../V3/struct/Token.sol";
import "./GovernorCheck.sol";
//import "hardhat/console.sol";

contract GovernorContract is
Governor,
GovernorCountingSimple,
GovernorTimelockControl,
GovernorSettings,
Initializable
{

    bytes32 public constant CANCELLER_ROLE = keccak256("CANCELLER_ROLE");


//    constructor(
//        string memory name,
//        IVotes _token,
//        TimelockController timelock
//    )
//    Governor(name)
//    GovernorSettings(address(timelock))
//    GovernorVotes(_token)
//    GovernorTimelockControl(timelock)
//    {
//        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
//        _setupRole(CANCELLER_ROLE, msg.sender);
//    }

    function initialize(string memory name,
        IVotes _token,
        TimelockController timelock,OsParams memory osParams, GovernorParams memory governorParams) public initializer {
        bytes32 hashedName = keccak256(bytes(name));
        bytes32 hashedVersion = keccak256(bytes(version()));
        bytes32 typeHash = keccak256(
            "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
        );
        _HASHED_NAME = hashedName;
        _HASHED_VERSION = hashedVersion;
        _CACHED_CHAIN_ID = block.chainid;
        _CACHED_DOMAIN_SEPARATOR = _buildDomainSeparator(typeHash, hashedName, hashedVersion);
        _CACHED_THIS = address(this);
        _TYPE_HASH = typeHash;
        _name = name;
        _setRoleAdmin(GOVERNORSETTINGS_ADMIN_ROLE, GOVERNORSETTINGS_ADMIN_ROLE);
        _setRoleAdmin(GOVERNOR_UPDATE_ROLE, GOVERNORSETTINGS_ADMIN_ROLE);
        _setRoleAdmin(OS_UPDATE_ROLE, GOVERNORSETTINGS_ADMIN_ROLE);

        _setupRole(GOVERNORSETTINGS_ADMIN_ROLE, msg.sender);
        _setupRole(GOVERNOR_UPDATE_ROLE, msg.sender);
        _setupRole(OS_UPDATE_ROLE, msg.sender);

        _setupRole(GOVERNORSETTINGS_ADMIN_ROLE, address(timelock));
        _setupRole(GOVERNOR_UPDATE_ROLE, address(timelock));
        _setupRole(OS_UPDATE_ROLE, address(timelock));
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(CANCELLER_ROLE, msg.sender);
        token = _token;
        _updateTimelock(TimelockController(timelock));
        require(osParams.clusterRuleAreaAddress!=address(0),"clusterRuleAreaAddress can not be zero");
        _votingDelay = governorParams.initialVotingDelay;
        _votingPeriod = governorParams.initialVotingPeriod;
        _updateVotingDelayMin = governorParams.updateVotingDelayMin;
        _updateVotingPeriodMin = governorParams.updateVotingPeriodMin;

        _clusterRuleAreaAddress = osParams.clusterRuleAreaAddress;
        _clusterId = osParams.clusterId;
        _ruleSlotIndexInput = osParams.ruleSlotIndexInput;
        _ruleSlotIndexOutput = osParams.ruleSlotIndexOutput;
        _govHandlerAddress=osParams.govHandlerAddress;

    }

    function votingDelay()
    public
    view
    override(IGovernor, GovernorSettings)
    returns (uint256)
    {
        return super.votingDelay();
    }

    function votingPeriod()
    public
    view
    override(IGovernor, GovernorSettings)
    returns (uint256)
    {
        return super.votingPeriod();
    }

    // The following functions are overrides required by Solidity.

//    function quorum(uint256 blockNumber)
//    public
//    view
//    override
//    returns (uint256)
//    {
//        return 0;
//    }
    function quorum(uint256 blockNumber,uint256 proposalId) public view returns(uint256){
        if(_proposals[proposalId].voteMode==voteFairMode){
            return quorumFair(proposalId);
        }else if(_proposals[proposalId].voteMode==voteNormalMode){
            return _quorum(blockNumber,proposalId);
        }
        return 0;
    }

    function _quorum(uint256 blockNumber,uint256 proposalId) public view override returns(uint256){
        return token.getPastTotalSupply(blockNumber) * _proposals[proposalId].quorumNumerator / 10000;
    }

    function quorumFair(uint256 proposalId) public view returns (uint256){
        return _proposals[proposalId].oneVotePerAddressQuorum;
    }

    function quorumFairReached(uint256 proposalId) public view returns (bool){
        ProposalVote storage proposalVotes = _proposalVotes[proposalId];
        ProposalCore storage proposalCore = _proposals[proposalId];
        return proposalVotes.abstainVotes + proposalVotes.forVotes >= proposalCore.oneVotePerAddressQuorum;
    }

//    function _getVotes(
//        address account,
//        uint256 blockNumber,
//        bytes memory params
//    ) internal view override(Governor, GovernorVotes) returns (uint256) {
//        return super._getVotes(account, blockNumber, params);
//    }

//    function _countVote(
//        uint256 proposalId,
//        address account,
//        uint8 support,
//        uint256 weight,
//        bytes memory params
//    ) internal override(Governor, GovernorCountingSimple) {
//        if (params.length > 0) {
//            (uint256 _uintParam, string memory _strParam) = abi.decode(params, (uint256, string));
//            require(_uintParam <= weight, "param error");
//            weight = _uintParam;
//        }
//        return super._countVote(proposalId, account, support, weight, params);
//    }

    function getVotes(address account, uint256 blockNumber)
    public
    view
    override(IGovernor, Governor)
    returns (uint256)
    {
        return super.getVotes(account, blockNumber);
    }

    function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description
    ) public override(IGovernor, Governor) returns (uint256) {
        return 0;
    }


    function _execute(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) {
        super._execute(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _cancel(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint256) {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function _executor()
    internal
    view
    override(Governor, GovernorTimelockControl)
    returns (address)
    {
        return super._executor();
    }


    function proposeWithType(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description,
        Token.Token[] memory inTokenList,
        uint8 proposalBranch,
        uint8 voteMode
    ) public virtual returns (uint256) {
//        require(initialized, "has not initialized");
        require(proposalBranch == proposalNormalBranch || proposalBranch == proposalAuditBranch, "proposalMode error");
        console.log("proposeWithType 1");
//        require(voteMode == voteNormalMode || voteMode == voteFairMode, "proposalMode error");
        if(voteMode==voteNormalMode){
            require(address(token)!=address(0),"token has not been set");
        }
        uint256 proposeId = super.propose(targets, values, calldatas, description);
        console.log("proposeWithType 2");
        checkForProposal(inTokenList, proposalBranch);
        (uint16 votingSucceedFactor,uint32 quorum)=GovernorCheck.getSucceedParams(GovernorCheck.GovernorCheckData(msg.sender,_clusterRuleAreaAddress,_clusterId,_ruleSlotIndexInput,_ruleSlotIndexOutput,proposalBranch),voteMode,_govHandlerAddress);
        ProposalCore storage proposalCore = _proposals[proposeId];
        proposalCore.clusterRuleAreaAddress = _clusterRuleAreaAddress;
        proposalCore.clusterId = _clusterId;
        proposalCore.ruleSlotIndexInput = _ruleSlotIndexInput;
        proposalCore.ruleSlotIndexOutput = _ruleSlotIndexOutput;
        proposalCore.proposalBranch = proposalBranch;
        proposalCore.voteMode = voteMode;
        if(voteMode==voteFairMode){
            proposalCore.oneVotePerAddressQuorum = quorum;
        }else{
            proposalCore.quorumNumerator=uint16(quorum);
        }
        proposalCore.votingSucceedFactor = votingSucceedFactor;
        return proposeId;
    }


    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(Governor, GovernorSettings, GovernorTimelockControl)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }


    function checkForProposal(Token.Token[] memory inTokenList, uint8 groupInputBranch) internal {
        GovernorCheck.check(inTokenList, GovernorCheck.GovernorCheckData(msg.sender, _clusterRuleAreaAddress, _clusterId, _ruleSlotIndexInput, _ruleSlotIndexOutput, groupInputBranch));
    }

    function checkForVote(uint256 proposalId, Token.Token[] memory inTokenList) internal {
        ProposalCore storage proposalCore = _proposals[proposalId];
        uint8 proposalMode = proposalCore.proposalBranch;
        require(proposalMode == proposalNormalBranch || proposalMode == proposalAuditBranch, "checkForVote:proposal mode error!");
        uint8 voteBranch = proposalMode == proposalNormalBranch ? voteNormalBranch : voteAuditBranch;
        require(proposalCore.clusterRuleAreaAddress != address(0), "checkForVote clusterRuleAreaAddress error");
        GovernorCheck.checkToken(_govHandlerAddress,proposalId,inTokenList, GovernorCheck.GovernorCheckData(msg.sender, proposalCore.clusterRuleAreaAddress, proposalCore.clusterId, proposalCore.ruleSlotIndexInput, proposalCore.ruleSlotIndexOutput, voteBranch));
    }

    //    event VoteCast(address indexed voter, uint256 proposalId, uint8 support, uint256 weight, string reason);
    //
    //    /**
    //     * @dev Emitted when a vote is cast with params.
    //     *
    //     * Note: `support` values should be seen as buckets. Their interpretation depends on the voting module used.
    //     * `params` are additional encoded parameters. Their intepepretation also depends on the voting module used.
    //     */
    //    event VoteCastWithParams(
    //        address indexed voter,
    //        uint256 proposalId,
    //        uint8 support,
    //        uint256 weight,
    //        string reason,
    //        bytes params
    //    );

    //    function castVoteWithType(uint256 proposalId, uint8 support, Token.Token[] memory inTokenList, uint8 voteMode) public virtual returns (uint256) {
    //        if (clusterAreaAddressSettedFlag) {
    //            checkForVote(proposalId, inTokenList);
    //        }
    //        if (voteMode == voteNormalMode) {
    //            return super.castVote(proposalId, support);
    //        }
    //        emit VoteCast(msg.sender, proposalId, support, 1, "");
    //        _countVote(proposalId, msg.sender, support, 1, "");
    //        return 1;
    //    }

    //    function castVoteWithReasonAndType(
    //        uint256 proposalId,
    //        uint8 support,
    //        string calldata reason,
    //        Token.Token[] memory inTokenList,
    //        uint8 voteMode
    //    ) public virtual returns (uint256) {
    //        if (clusterAreaAddressSettedFlag) {
    //            checkForVote(proposalId, inTokenList);
    //        }
    //        if (voteMode == voteNormalMode) {
    //            return super.castVoteWithReason(proposalId, support, reason);
    //        }
    //        emit VoteCast(msg.sender, proposalId, support, 1, reason);
    //        _countVote(proposalId, msg.sender, support, 1, "");
    //        return 1;
    //    }

    function castVoteWithReasonParamsAndType(
        uint256 proposalId,
        uint8 support,
        string calldata reason,
        bytes memory params,
        Token.Token[] memory inTokenList
    ) public virtual returns (uint256) {
        ProposalCore storage proposal = _proposals[proposalId];
        checkForVote(proposalId, inTokenList);
//        console.log("castVoteWithReasonParamsAndType check pass");
        if (proposal.voteMode == voteNormalMode) {
            return super.castVoteWithReasonAndParams(proposalId, support, reason, params);
        }
        console.log("state begin");
        require(state(proposalId) == ProposalState.Active, "Governor: vote not currently active");
        console.log("state begin");
        emit VoteCastWithParams(msg.sender, proposalId, support, 1, reason, "");
        _countVote(proposalId, msg.sender, support, 1, params);
        return 1;
    }

    //    function castVoteBySigWithType(
    //        uint256 proposalId,
    //        uint8 support,
    //        uint8 v,
    //        bytes32 r,
    //        bytes32 s,
    //        Token.Token[] memory inTokenList,
    //        uint8 voteMode
    //    ) public virtual returns (uint256) {
    //        if (clusterAreaAddressSettedFlag) {
    //            checkForVote(proposalId, inTokenList);
    //        }
    //        if (voteMode == voteNormalMode) {
    //            return super.castVoteBySig(proposalId, support, v, r, s);
    //        }
    ////        address voter = ECDSA.recover(
    ////            _hashTypedDataV4(keccak256(abi.encode(BALLOT_TYPEHASH, proposalId, support))),
    ////            v,
    ////            r,
    ////            s
    ////        );
    ////        emit VoteCast(voter, proposalId, support, 1, "");
    ////        _countVote(proposalId, voter, support, 1, "");
    //        return 1;
    //    }

    function castVoteWithReasonParamsAndTypeBySig(
        uint256 proposalId,
        uint8 support,
        string calldata reason,
        bytes memory params,
        uint8 v,
        bytes32 r,
        bytes32 s,
        Token.Token[] memory inTokenList) public virtual returns (uint256) {
        ProposalCore storage proposal = _proposals[proposalId];
        checkForVote(proposalId, inTokenList);

        if (proposal.voteMode == voteNormalMode) {
            return super.castVoteWithReasonAndParamsBySig(proposalId, support, reason, params, v, r, s);
        }
        address voter = ECDSA.recover(
            _hashTypedDataV4(
                keccak256(
                    abi.encode(
                        EXTENDED_BALLOT_TYPEHASH,
                        proposalId,
                        support,
                        keccak256(bytes(reason)),
                        keccak256(params)
                    )
                )
            ),
            v,
            r,
            s
        );
        require(state(proposalId) == ProposalState.Active, "Governor: vote not currently active");
        emit VoteCastWithParams(voter, proposalId, support, 1, reason, "");
        _countVote(proposalId, voter, support, 1, "");
        return 1;
    }


    //    function castVote(uint256 proposalId, uint8 support) public virtual override(IGovernor, Governor) returns (uint256) {
    //        return 0;
    //    }

    /**
     * @dev See {IGovernor-castVoteWithReason}.
     */
    //    function castVoteWithReason(
    //        uint256 proposalId,
    //        uint8 support,
    //        string calldata reason
    //    ) public virtual override(IGovernor, Governor) returns (uint256) {
    //        return 0;
    //    }

    /**
     * @dev See {IGovernor-castVoteWithReasonAndParams}.
     */
    function castVoteWithReasonAndParams(
        uint256 proposalId,
        uint8 support,
        string calldata reason,
        bytes memory params
    ) public virtual override(IGovernor, Governor) returns (uint256) {
        return 0;
    }

    /**
     * @dev See {IGovernor-castVoteBySig}.
     */
    //    function castVoteBySig(
    //        uint256 proposalId,
    //        uint8 support,
    //        uint8 v,
    //        bytes32 r,
    //        bytes32 s
    //    ) public virtual override(IGovernor, Governor) returns (uint256) {
    //        return 0;
    //    }

    /**
     * @dev See {IGovernor-castVoteWithReasonAndParamsBySig}.
     */
    function castVoteWithReasonAndParamsBySig(
        uint256 proposalId,
        uint8 support,
        string calldata reason,
        bytes memory params,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public virtual override(IGovernor, Governor) returns (uint256) {
        return 0;
    }

    function voteSucceeded(uint256 proposalId) public view virtual returns (bool) {
        ProposalVote storage proposalVote = _proposalVotes[proposalId];
        uint256 totalVotes = proposalVote.againstVotes + proposalVote.forVotes + proposalVote.abstainVotes;
        ProposalCore storage proposalCore = _proposals[proposalId];

        return ceilDiv(10000 * proposalVote.forVotes, totalVotes) >= proposalCore.votingSucceedFactor;
    }
    function _voteSucceeded(uint256 proposalId) internal view virtual override(Governor, GovernorCountingSimple) returns (bool) {
        ProposalVote storage proposalVote = _proposalVotes[proposalId];
        uint256 totalVotes = proposalVote.againstVotes + proposalVote.forVotes + proposalVote.abstainVotes;
        ProposalCore storage proposalCore = _proposals[proposalId];

        return ceilDiv(10000 * proposalVote.forVotes, totalVotes) >= proposalCore.votingSucceedFactor;
    }

    function ceilDiv(uint256 a, uint256 b) internal pure returns (uint256) {
        // (a + b - 1) / b can overflow on addition, so we distribute.
        return a == 0 ? 0 : (a - 1) / b + 1;
    }
    //    function state(uint256 proposalId) public view virtual override returns (ProposalState) {

    //    }
    //    function state(uint256 proposalId) public view virtual override(Governor, GovernorTimelockControl) returns (ProposalState){
    //        return super.state(proposalId);
    //    }
    function state(uint256 proposalId) public view virtual override(Governor, GovernorTimelockControl) returns (ProposalState){
        ProposalCore storage proposal = _proposals[proposalId];
        require(proposal.voteMode != 0, "Governor: unknown proposal id");
        if (proposal.voteMode == voteFairMode) {
            if (proposal.executed) {
                return ProposalState.Executed;
            }

            if (proposal.canceled) {
                return ProposalState.Canceled;
            }

            uint256 snapshot = proposalSnapshot(proposalId);

            if (snapshot >= Chain.getBlockNumber()) {
                return ProposalState.Pending;
            }

            uint256 deadline = proposalDeadline(proposalId);

            if (deadline >=  Chain.getBlockNumber()) {
                return ProposalState.Active;
            }

            if (quorumFairReached(proposalId) && _voteSucceeded(proposalId)) {
                // core tracks execution, so we just have to check if successful proposal have been queued.
                bytes32 queueid = _timelockIds[proposalId];

                if (queueid == bytes32(0)) {
                    return ProposalState.Succeeded;
                } else if (TimelockController(_timelock).isOperationDone(queueid)) {
                    return ProposalState.Executed;
                } else if (TimelockController(_timelock).isOperationPending(queueid)) {
                    return ProposalState.Queued;
                } else {
                    return ProposalState.Canceled;
                }

            } else {
                return ProposalState.Defeated;
            }
        } else if(proposal.voteMode == voteNormalMode) {
            return super.state(proposalId);
        }
        return ProposalState.Executed;
    }

    function cancel(address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash) external onlyRole(CANCELLER_ROLE){
        _cancel(targets,values,calldatas,descriptionHash);
    }

//    function setTokenAddress(address tokenAddress) external onlyRole(DEFAULT_ADMIN_ROLE){
//        require(address(token)==address(0),"token has been set");
//        token=IVotes(tokenAddress);
//    }

}
