// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (governance/extensions/GovernorSettings.sol)

pragma solidity ^0.8.0;

import "./Governor.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "./IVotes.sol";


/**
 * @dev Extension of {Governor} for settings updatable through governance.
 *
 * _Available since v4.4._
 */
abstract contract GovernorSettings is Governor, AccessControlEnumerable {
    uint256 internal _votingDelay;
    uint256 internal _votingPeriod;
    bytes32 public constant GOVERNORSETTINGS_ADMIN_ROLE = keccak256("GOVERNORSETTINGS_ADMIN_ROLE");
    bytes32 public constant GOVERNOR_UPDATE_ROLE = keccak256("GOVERNOR_UPDATE_ROLE");
    bytes32 public constant OS_UPDATE_ROLE = keccak256("OS_UPDATE_ROLE");

    uint256 _updateVotingDelayMin;
    uint256 _updateVotingPeriodMin;
    address _clusterRuleAreaAddress;
//    bool public initialized;
    uint32 _clusterId;
    uint16 _ruleSlotIndexInput;
    uint16 _ruleSlotIndexOutput;
    address _govHandlerAddress;
    IVotes public token;

    uint8 public constant proposalNormalBranch = 1;
    uint8 public constant voteNormalBranch = 2;
    uint8 public constant proposalAuditBranch = 3;
    uint8 public constant voteAuditBranch = 4;
    uint8 public constant voteNormalMode = 1;
    uint8 public constant voteFairMode = 2;

    struct OsParams {
        address clusterRuleAreaAddress;
        uint32 clusterId;
        uint16 ruleSlotIndexInput;
        uint16 ruleSlotIndexOutput;
        address govHandlerAddress;

    }

    struct GovernorParams {
        uint256 initialVotingDelay;
        uint256 initialVotingPeriod;
        uint256 updateVotingDelayMin;
        uint256 updateVotingPeriodMin;

    }

    event VotingDelaySet(uint256 oldVotingDelay, uint256 newVotingDelay);
    event VotingPeriodSet(uint256 oldVotingPeriod, uint256 newVotingPeriod);

    event OldParams(address clusterRuleAreaAddress,uint32 clusterId,uint16 ruleSlotIndexInput,uint16 ruleSlotIndexOutput,address govHandlerAddress);
    event NewParams(address clusterRuleAreaAddress,uint32 clusterId,uint16 ruleSlotIndexInput,uint16 ruleSlotIndexOutput,address govHandlerAddress);


    /**
     * @dev See {IGovernor-votingDelay}.
     */
    function votingDelay() public view virtual override returns (uint256) {
        return _votingDelay;
    }

    /**
     * @dev See {IGovernor-votingPeriod}.
     */
    function votingPeriod() public view virtual override returns (uint256) {
        return _votingPeriod;
    }


    function setVotingDelay(uint256 newVotingDelay) public virtual onlyRole(GOVERNOR_UPDATE_ROLE) {
        _setVotingDelay(newVotingDelay);
    }

    /**
     * @dev Update the voting period. This operation can only be performed through a governance proposal.
     *
     * Emits a {VotingPeriodSet} event.
     */
    function setVotingPeriod(uint256 newVotingPeriod) public virtual onlyRole(GOVERNOR_UPDATE_ROLE) {
        _setVotingPeriod(newVotingPeriod);
    }

    function setParams(OsParams memory osParams) public onlyRole(GOVERNOR_UPDATE_ROLE){
        _clusterRuleAreaAddress=osParams.clusterRuleAreaAddress;
        _govHandlerAddress=osParams.govHandlerAddress;
        _ruleSlotIndexInput=osParams.ruleSlotIndexInput;
        _ruleSlotIndexOutput=osParams.ruleSlotIndexOutput;
        _clusterId=osParams.clusterId;
        emit OldParams(_clusterRuleAreaAddress,_clusterId,_ruleSlotIndexInput,_ruleSlotIndexOutput,_govHandlerAddress);
        emit NewParams(osParams.clusterRuleAreaAddress,osParams.clusterId,osParams.ruleSlotIndexInput,osParams.ruleSlotIndexOutput,osParams.govHandlerAddress);
    }

    function _getVotes(
        address account,
        uint256 blockNumber,
        bytes memory /*params*/
    ) internal view virtual override returns (uint256) {
        return token.getPastVotes(account, blockNumber);
    }

    function setToken(IVotes newToken) public onlyRole(GOVERNOR_UPDATE_ROLE){
        token=newToken;
    }


//    function setClusterRuleAreaAddress(address newClusterRuleAreaAddress) public virtual onlyRole(OS_UPDATE_ROLE) {
//        _setClusterRuleAreaAddress(newClusterRuleAreaAddress);
//    }
//
//    function setClusterId(uint32 newClusterId) public virtual onlyRole(OS_UPDATE_ROLE) {
//        _setClusterId(newClusterId);
//    }
//
//
//    function setRuleSlotIndexInput(uint16 newRuleSlotIndexInput) public virtual onlyRole(OS_UPDATE_ROLE) {
//        _setRuleSlotIndexInput(newRuleSlotIndexInput);
//    }
//
//    function setRuleSlotIndexOutput(uint16 newRuleSlotIndexOutput) public virtual onlyRole(OS_UPDATE_ROLE) {
//        _setRuleSlotIndexOutput(newRuleSlotIndexOutput);
//    }
//
//
//    function _setClusterRuleAreaAddress(address newClusterRuleAreaAddress) internal virtual {
//        emit ClusterRuleAreaAddressSet(_clusterRuleAreaAddress, newClusterRuleAreaAddress);
//        _clusterRuleAreaAddress = newClusterRuleAreaAddress;
//    }
//
//    function _setClusterId(uint32 newClusterId) internal virtual {
//        emit ClusterIdSet(_clusterId, newClusterId);
//        _clusterId = newClusterId;
//    }
//
//    function _setRuleSlotIndexInput(uint16 newRuleSlotIndexInput) internal virtual {
//        emit RuleSlotIndexInputSet(_ruleSlotIndexInput, newRuleSlotIndexInput);
//        _ruleSlotIndexInput = newRuleSlotIndexInput;
//    }
//
//    function _setRuleSlotIndexOutput(uint16 newRuleSlotIndexOutput) internal virtual {
//        emit RuleSlotIndexOutputSet(_ruleSlotIndexOutput, newRuleSlotIndexOutput);
//        _ruleSlotIndexOutput = newRuleSlotIndexOutput;
//    }

//    function clusterRuleAreaAddress() public view virtual returns (address) {
//        return _clusterRuleAreaAddress;
//    }
//
//    function clusterId() public view virtual returns (uint32){
//        return _clusterId;
//    }
//
//    function ruleSlotIndexInput() public view virtual returns (uint16) {
//        return _ruleSlotIndexInput;
//    }
//
//    function ruleSlotIndexOutput() public view virtual returns (uint16) {
//        return _ruleSlotIndexOutput;
//    }

    function getParams() external view returns(OsParams memory,GovernorParams memory){
        OsParams memory osParams;
        GovernorParams memory governorParams;
        osParams.clusterRuleAreaAddress=_clusterRuleAreaAddress;
        osParams.ruleSlotIndexInput=_ruleSlotIndexInput;
        osParams.ruleSlotIndexOutput=_ruleSlotIndexOutput;
        osParams.clusterId=_clusterId;
        osParams.govHandlerAddress=_govHandlerAddress;

        governorParams.updateVotingPeriodMin=_updateVotingPeriodMin;
        governorParams.updateVotingDelayMin=_updateVotingDelayMin;
        governorParams.initialVotingDelay=_votingDelay;
        governorParams.initialVotingPeriod=_votingPeriod;
        return (osParams,governorParams);
    }

    function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(Governor, AccessControlEnumerable)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    /**
     * @dev Internal setter for the voting delay.
     *
     * Emits a {VotingDelaySet} event.
     */
    function _setVotingDelay(uint256 newVotingDelay) internal virtual {
        require(newVotingDelay >= _updateVotingDelayMin, "GovernorSettings: voting delay too low");
        emit VotingDelaySet(_votingDelay, newVotingDelay);
        _votingDelay = newVotingDelay;
    }

    /**
     * @dev Internal setter for the voting period.
     *
     * Emits a {VotingPeriodSet} event.
     */
    function _setVotingPeriod(uint256 newVotingPeriod) internal virtual {
        // voting period must be at least one block long
        require(newVotingPeriod >= _updateVotingPeriodMin, "GovernorSettings: voting period too low");
        emit VotingPeriodSet(_votingPeriod, newVotingPeriod);
        _votingPeriod = newVotingPeriod;
    }



}
