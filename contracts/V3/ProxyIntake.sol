//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract ProxyIntake is ERC1967Proxy {
    constructor(
        address _logic,
        address _admin,
        bytes memory _data) ERC1967Proxy(_logic, _data){
        assert(_ADMIN_SLOT == bytes32(uint256(keccak256("eip1967.proxy.admin")) - 1));
        _changeAdmin(_admin);
    }

    modifier ifAdmin() {
        if (msg.sender == _getAdmin()) {
            _;
        } else {
            _fallback();
        }
    }

    function admin() external ifAdmin returns (address admin_) {
        admin_ = _getAdmin();
    }

    function changeAdmin(address newAdmin) external virtual ifAdmin {
        _changeAdmin(newAdmin);
    }

    function implementation() external ifAdmin returns (address implementation_) {
        implementation_ = _implementation();
    }

    function upgradeTo(address newImplementation) external ifAdmin {
        super._upgradeTo(newImplementation);
    }

    function upgradeToAndCall(address newImplementation, bytes memory data, bool forceCall) external payable ifAdmin {
        super._upgradeToAndCall(newImplementation,data,forceCall);
    }

    function upgradeToAndCallUUPS(address newImplementation, bytes memory data, bool forceCall) external payable ifAdmin {
        super._upgradeToAndCallUUPS(newImplementation, data, forceCall);
    }

    function _beforeFallback() internal virtual override {
        require(msg.sender != _getAdmin(), "ProxyIntake: admin cannot fallback to proxy target");
        super._beforeFallback();
    }
}
