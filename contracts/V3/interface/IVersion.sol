pragma solidity ^0.8.0;

string constant ENGINE_RANDOM_GENERATOR = "RandomGenerator";
string constant ENGINE_CLUSTER_RULE_AREA = "ClusterRuleArea";
string constant ENGINE_CLUSTER_RULE_AREA_HANDLER = "ClusterRuleAreaHandler";
string constant ENGINE_CLUSTER_ATTRIBUTE_AREA = "ClusterAttributeArea";
string constant ENGINE_CLUSTER_ATTRIBUTE_AREA_TOKEN = "ClusterAttributeAreaToken";
string constant ENGINE_CLUSTER_MOUNTING_AREA = "ClusterMountingArea";

interface IVersion {

    function version() external pure returns (uint);

    function cname() external pure returns (string memory);

}
