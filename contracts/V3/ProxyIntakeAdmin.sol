pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ProxyIntake.sol";


contract ProxyIntakeAdmin is Ownable{

    function getProxyImplementation(ProxyIntake proxy) public view virtual returns (address) {
        // We need to manually run the static call since the getter cannot be flagged as view
        // bytes4(keccak256("implementation()")) == 0x5c60da1b
        (bool success, bytes memory returnData) = address(proxy).staticcall(hex"5c60da1b");
        require(success);
        return abi.decode(returnData, (address));
    }

    function getProxyAdmin(ProxyIntake proxy) public view virtual returns (address) {
        // We need to manually run the static call since the getter cannot be flagged as view
        // bytes4(keccak256("admin()")) == 0xf851a440
        (bool success, bytes memory returnData) = address(proxy).staticcall(hex"f851a440");
        require(success);
        return abi.decode(returnData, (address));
    }

    function changeProxyAdmin(ProxyIntake proxy, address newAdmin) public virtual onlyOwner {
        proxy.changeAdmin(newAdmin);
    }

    function upgradeTo(ProxyIntake proxy, address implementation) public virtual onlyOwner {
        proxy.upgradeTo(implementation);
    }

    function upgradeToAndCall(
        ProxyIntake proxy,
        address implementation,
        bytes memory data,
         bool forceCall
    ) public payable virtual onlyOwner {
        proxy.upgradeToAndCall{value: msg.value}(implementation, data, forceCall);
    }

}
