// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../util/StringUtil.sol";
import "../struct/Constant.sol";
import "hardhat/console.sol";
import "../util/Arrays.sol";
import "../util/Bit.sol";

library Token {
    function ercToString(uint8 erc) internal view returns (string memory) {
        if (erc == TOKEN_ERC_COIN) return "Coin";
        if (erc == TOKEN_ERC_ERC20) return "ERC20";
        if (erc == TOKEN_ERC_ERC721) return "ERC721";
        if (erc == TOKEN_ERC_ERC1155) return "ERC1155";
        return "Empty";
    }

    uint8 constant BIT_TOKEN_TEMPLATE_TYPE = 4;
    uint8 constant BIT_TOKEN_TEMPLATE_TYPE_SHIFT = 0;
    uint8 constant BIT_TOKEN_TEMPLATE_ID_REQUIRED = 4;
    uint8 constant BIT_TOKEN_TEMPLATE_ID_REQUIRED_SHIFT = BIT_TOKEN_TEMPLATE_TYPE + BIT_TOKEN_TEMPLATE_TYPE_SHIFT;
    uint8 constant BIT_TOKEN_TEMPLATE_ID_COUNT = 16;
    uint8 constant BIT_TOKEN_TEMPLATE_ID_COUNT_SHIFT = BIT_TOKEN_TEMPLATE_ID_REQUIRED + BIT_TOKEN_TEMPLATE_ID_REQUIRED_SHIFT;
    uint8 constant BIT_TOKEN_TEMPLATE_ID_FORMULA_REQUIRED = 2;
    uint8 constant BIT_TOKEN_TEMPLATE_ID_FORMULA_REQUIRED_SHIFT = BIT_TOKEN_TEMPLATE_ID_COUNT + BIT_TOKEN_TEMPLATE_ID_COUNT_SHIFT;
    uint8 constant BIT_TOKEN_TEMPLATE_AMOUNT_REQUIRED = 4;
    uint8 constant BIT_TOKEN_TEMPLATE_AMOUNT_REQUIRED_SHIFT = BIT_TOKEN_TEMPLATE_ID_FORMULA_REQUIRED + BIT_TOKEN_TEMPLATE_ID_FORMULA_REQUIRED_SHIFT;
    uint8 constant BIT_TOKEN_TEMPLATE_AMOUNT_COUNT = 2;
    uint8 constant BIT_TOKEN_TEMPLATE_AMOUNT_COUNT_SHIFT = BIT_TOKEN_TEMPLATE_AMOUNT_REQUIRED + BIT_TOKEN_TEMPLATE_AMOUNT_REQUIRED_SHIFT;


    /*
      721 autoid increment mint : id = 0 ,idEnd = 0
      721 mint id : 0 < id < idEnd
      721 mint : idList

      1155 mint random id : 0 < id < idEnd
      1155 mint random: idList

      amount = 0 , mint (0,100)
    */
    struct TokenTemplate {
        uint8 erc; // 0 coin 1 erc20 2 erc721 3 erc1155
        address token;
        uint256[] valueList;

        //(u) unrequired
        //ERC20/COIN   [type,amount,amountEnd]
        //ERC721  [type,idIndex,id,idEnd,   idFormula(u),amount(u),amountEnd(u),amountFormula(u)]
        //ERC721  [type,idIndex,id1,id2,id3,idFormula(u),amount(u),amountEnd(u),amountFormula(u)]
        //ERC1155 [type,idIndex,amount,amountEnd,id,idEnd,   idFormula(u),amountFormula(u)]
        //ERC1155 [type,idIndex,amount,amountEnd,id1,id2,id3,idFormula(u),amountFormula(u)]


        // uint256 idIndex;//index for minting or transferring of erc721
        // uint256 id; //begin id or specific id
        // uint256 idEnd;
        // uint256[] idList;
        // uint256 amount; // begin amount or specific amount
        // uint256 amountEnd;
    }

    //this is used in inTokenList
    struct AttributeIn{
        uint32 attrId;
        int40 attrAmount;
    }


    struct Token {
        uint8 erc; // 0 coin 1 erc20 2 erc721 3 erc1155
        address token;
        uint256 id;//begin id or specific id
        uint256 amount;// begin amount or specific amount

        AttributeIn[] attrInList;
    }

    struct TokenMounting {
        uint8 erc;
        address token;
        uint256 id;
        uint256 amount;
    }

    struct TokenHandler {
        uint256 id;
        uint256 amount;
        uint256 idIndex;//ERC721 ERC1155 index
    }

    function getIdIndex(TokenTemplate memory self) internal view returns (uint256){
        if (self.erc == TOKEN_ERC_COIN || self.erc == TOKEN_ERC_ERC20) {
            return 0;
        }
        return self.valueList[1];
    }

    function setIdIndex(TokenTemplate storage self, uint256 idIndex) internal {
        if (self.erc == TOKEN_ERC_ERC721 || self.erc == TOKEN_ERC_ERC1155) {
            self.valueList[1] = idIndex;
        }
    }

    function getAmountRange(TokenTemplate memory self) internal view returns (uint256[] memory){
        uint256[] memory amountRange = new uint256[](2);
        if (self.erc == TOKEN_ERC_COIN || self.erc == TOKEN_ERC_ERC20) {
            amountRange[0] = self.valueList[1];
            amountRange[1] = self.valueList[2];
        } else if (self.erc == TOKEN_ERC_ERC1155) {//ERC1155
            amountRange[0] = self.valueList[2];
            amountRange[1] = self.valueList[3];
        } else if (self.erc == TOKEN_ERC_ERC721) {
            uint8 amountCount = getAmountCount(self);
            if (amountCount == 2) {
                uint16 idCount = getIdCount(self);
                uint8 idFormulaRequired = getIdFormulaRequired(self);
                amountRange[0] = self.valueList[2 + idCount + idFormulaRequired];
                amountRange[1] = self.valueList[3 + idCount + idFormulaRequired];
            }
        }
        return amountRange;
    }

    function setAmountRange(TokenTemplate memory self, uint256[] memory amountRange) internal {
        if (getAmountRequired(self) == TOKEN_TEMPLATE_AMOUNT_REQUIRED_FALSE) {
            return;
        }
        if (self.erc == TOKEN_ERC_COIN || self.erc == TOKEN_ERC_ERC20) {
            self.valueList[1] = amountRange[0];
            self.valueList[2] = amountRange[1];
        } else if (self.erc == TOKEN_ERC_ERC1155) {//ERC1155
            self.valueList[2] = amountRange[0];
            self.valueList[3] = amountRange[1];
        } else if (self.erc == TOKEN_ERC_ERC721) {
            uint16 idCount = getIdCount(self);
            uint8 idFormulaRequired = getIdFormulaRequired(self);
            self.valueList[2 + idCount + idFormulaRequired] = amountRange[0];
            self.valueList[3 + idCount + idFormulaRequired] = amountRange[1];
        }
    }


    function getIdRange(TokenTemplate memory self) internal view returns (uint256[] memory){
        uint256[] memory idRange = new uint256[](2);
        if (self.erc == TOKEN_ERC_ERC721) {
            uint8 templateType = getType(self);
            if (templateType == TOKEN_TEMPLATE_TYPE_ID_RANGE) {
                idRange[0] = self.valueList[2];
                idRange[1] = self.valueList[3];
            }
        } else if (self.erc == TOKEN_ERC_ERC1155) {
            uint8 templateType = getType(self);
            if (templateType == TOKEN_TEMPLATE_TYPE_ID_RANGE) {
                idRange[0] = self.valueList[4];
                idRange[1] = self.valueList[5];
            }
        }
        return idRange;
    }

    function getIdList(TokenTemplate memory self) internal view returns (uint256[] memory){
        if (self.erc == TOKEN_ERC_COIN || self.erc == TOKEN_ERC_ERC20) {
            return new uint256[](0);
        } else if (self.erc == TOKEN_ERC_ERC721) {
            uint8 templateType = getType(self);
            if (templateType == TOKEN_TEMPLATE_TYPE_ID_LIST) {
                uint16 idCount = getIdCount(self);
                uint256[] memory idList = new uint256[](idCount);
                for (uint256 i; i < idCount; i++)
                    idList[i] = self.valueList[i + 2];
                return idList;
            }
        } else if (self.erc == TOKEN_ERC_ERC1155) {
            uint8 templateType = getType(self);
            if (templateType == TOKEN_TEMPLATE_TYPE_ID_LIST) {
                uint16 idCount = getIdCount(self);
                uint256[] memory idList = new uint256[](idCount);
                for (uint256 i; i < idCount; i++)
                    idList[i] = self.valueList[i + 4];
                return idList;
            }
        }

        return new uint256[](0);
    }



    //this base on the id list is in order
    function searchId(TokenTemplate memory self, uint256 findingId) internal view returns (int){

        if (self.erc == TOKEN_ERC_COIN || self.erc == TOKEN_ERC_ERC20) {
            return - 1;
        } else if (self.erc == TOKEN_ERC_ERC1155) {//ERC 1155
            uint8 templateType = getType(self);
            if (templateType == TOKEN_TEMPLATE_TYPE_ID_LIST) {
                uint16 idCount = getIdCount(self);
                uint256 templateType = self.valueList[0];
                uint256 idIndex = self.valueList[1];
                uint256 amount = self.valueList[2];
                uint256 amountEnd = self.valueList[3];

                self.valueList[0] = 0;
                self.valueList[1] = 0;
                self.valueList[2] = 0;
                self.valueList[3] = 0;

                uint256 index = Arrays.findUpperBound(self.valueList, 4 + idCount, findingId);

                self.valueList[0] = templateType;
                self.valueList[1] = idIndex;
                self.valueList[2] = amount;
                self.valueList[3] = amountEnd;

                int found = - 1;
                if (self.valueList[index] == findingId) {
                    found = int(index - 4);
                }

                console.log("------------- ERC1155 Token binary search token", self.token);
                console.log("------------- ERC1155 Token binary search findingId", findingId);
                console.log("------------- ERC1155 Token binary search find index", index);
                console.log("------------- ERC1155 Token binary search find value[index]", self.valueList[index]);
                console.log("------------- ERC1155 Token binary search find found", uint256(found));
                return found;
            }
            return - 1;
        } else if (self.erc == TOKEN_ERC_ERC721) {
            uint8 templateType = getType(self);
            if (templateType == TOKEN_TEMPLATE_TYPE_ID_LIST) {
                uint16 idCount = getIdCount(self);
                uint256 templateType = self.valueList[0];
                uint256 idIndex = self.valueList[1];

                self.valueList[0] = 0;
                self.valueList[1] = 0;

                uint256 index = Arrays.findUpperBound(self.valueList, 2 + idCount, findingId);

                self.valueList[0] = templateType;
                self.valueList[1] = idIndex;

                int found = - 1;
                if (self.valueList[index] == findingId) {
                    found = int(index - 4);
                }

                console.log("------------- ERC721 Token binary search token", self.token);
                console.log("------------- ERC721 Token binary search findingId", findingId);
                console.log("------------- ERC721 Token binary search find index", index);
                console.log("------------- ERC721 Token binary search find value[index]", self.valueList[index]);
                console.log("------------- ERC721 Token binary search find found", uint256(found));
                return found;
            }
            return - 1;
        }

        return - 1;
    }


    function getIdListLength(TokenTemplate memory self) internal view returns (uint256){
        if (self.erc == TOKEN_ERC_COIN || self.erc == TOKEN_ERC_ERC20) {
            return 0;
        } else if (self.erc == TOKEN_ERC_ERC721 || self.erc == TOKEN_ERC_ERC1155) {
            uint8 templateType = getType(self);
            if (templateType == TOKEN_TEMPLATE_TYPE_ID_LIST) {
                uint16 idCount = getIdCount(self);
                return idCount;
            }
            return 0;
        }
        return 0;
    }

    function getId(TokenTemplate memory self, uint256 index) internal view returns (uint256){
        if (self.erc == TOKEN_ERC_COIN || self.erc == TOKEN_ERC_ERC20) {
            return 0;
        } else if (self.erc == TOKEN_ERC_ERC721) {
            uint8 templateType = getType(self);
            if (templateType == TOKEN_TEMPLATE_TYPE_ID_LIST) {
                uint16 idCount = getIdCount(self);
                if (index < idCount)
                    return self.valueList[index + 2];
            }
        } else if (self.erc == TOKEN_ERC_ERC1155) {
            uint8 templateType = getType(self);
            if (templateType == TOKEN_TEMPLATE_TYPE_ID_LIST) {
                uint16 idCount = getIdCount(self);
                if (index < idCount)
                    return self.valueList[index + 4];
            }
        }
        return 0;
    }

    function setType(TokenTemplate memory self, uint8 templateType) internal {
        self.valueList[0] = Bit.bit(self.valueList[0], templateType, BIT_TOKEN_TEMPLATE_TYPE, BIT_TOKEN_TEMPLATE_TYPE_SHIFT);
    }

    function getType(TokenTemplate memory self) internal view returns (uint8){
        return uint8(Bit.bitValue(self.valueList[0], BIT_TOKEN_TEMPLATE_TYPE, BIT_TOKEN_TEMPLATE_TYPE_SHIFT));
    }

    function setIdRequired(TokenTemplate memory self, uint8 idRequired) internal {
        self.valueList[0] = Bit.bit(self.valueList[0], idRequired, BIT_TOKEN_TEMPLATE_ID_REQUIRED, BIT_TOKEN_TEMPLATE_ID_REQUIRED_SHIFT);
    }

    function getIdRequired(TokenTemplate memory self) internal view returns (uint8){
        return uint8(Bit.bitValue(self.valueList[0], BIT_TOKEN_TEMPLATE_ID_REQUIRED, BIT_TOKEN_TEMPLATE_ID_REQUIRED_SHIFT));
    }

    function setIdCount(TokenTemplate memory self, uint16 idCount) internal {
        if (self.erc == TOKEN_ERC_ERC721 || self.erc == TOKEN_ERC_ERC1155) {
            self.valueList[0] = Bit.bit(self.valueList[0], idCount, BIT_TOKEN_TEMPLATE_ID_COUNT, BIT_TOKEN_TEMPLATE_ID_COUNT_SHIFT);
        }
    }

    function getIdCount(TokenTemplate memory self) internal view returns (uint16){
        if (self.erc == TOKEN_ERC_ERC721 || self.erc == TOKEN_ERC_ERC1155) {
            return uint16(Bit.bitValue(self.valueList[0], BIT_TOKEN_TEMPLATE_ID_COUNT, BIT_TOKEN_TEMPLATE_ID_COUNT_SHIFT));
        }
        return 0;
    }

    function setIdFormulaRequired(TokenTemplate memory self, uint8 required) internal {
        if (self.erc == TOKEN_ERC_ERC721 || self.erc == TOKEN_ERC_ERC1155) {
            self.valueList[0] = Bit.bit(self.valueList[0], required, BIT_TOKEN_TEMPLATE_ID_FORMULA_REQUIRED, BIT_TOKEN_TEMPLATE_ID_FORMULA_REQUIRED_SHIFT);
        }
    }

    function getIdFormulaRequired(TokenTemplate memory self) internal view returns (uint8){
        if (self.erc == TOKEN_ERC_ERC721 || self.erc == TOKEN_ERC_ERC1155) {
            return uint8(Bit.bitValue(self.valueList[0], BIT_TOKEN_TEMPLATE_ID_FORMULA_REQUIRED, BIT_TOKEN_TEMPLATE_ID_FORMULA_REQUIRED_SHIFT));
        }
        return 0;
    }

    function setAmountRequired(TokenTemplate memory self, uint8 amountRequired) internal {
        self.valueList[0] = Bit.bit(self.valueList[0], amountRequired, BIT_TOKEN_TEMPLATE_AMOUNT_REQUIRED, BIT_TOKEN_TEMPLATE_AMOUNT_REQUIRED_SHIFT);
    }

    function getAmountRequired(TokenTemplate memory self) internal view returns (uint8){
        return uint8(Bit.bitValue(self.valueList[0], BIT_TOKEN_TEMPLATE_AMOUNT_REQUIRED, BIT_TOKEN_TEMPLATE_AMOUNT_REQUIRED_SHIFT));
    }

    function setAmountCount(TokenTemplate memory self, uint8 amountCount) internal {
        if (self.erc == TOKEN_ERC_ERC721 || self.erc == TOKEN_ERC_ERC1155) {
            self.valueList[0] = Bit.bit(self.valueList[0], amountCount, BIT_TOKEN_TEMPLATE_AMOUNT_COUNT, BIT_TOKEN_TEMPLATE_AMOUNT_COUNT_SHIFT);
        }
    }

    function getAmountCount(TokenTemplate memory self) internal view returns (uint8){
        if (self.erc == TOKEN_ERC_ERC721) {
            return uint8(Bit.bitValue(self.valueList[0], BIT_TOKEN_TEMPLATE_AMOUNT_COUNT, BIT_TOKEN_TEMPLATE_AMOUNT_COUNT_SHIFT));
        }
        return 2;
    }


    function checkTokenRequiredExist(TokenTemplate memory self) internal view returns (bool){
        uint8 idRequired = getIdRequired(self);
        uint8 amountRequired = getAmountRequired(self);
        if (self.erc == TOKEN_ERC_ERC721 && idRequired == TOKEN_TEMPLATE_ID_REQUIRED_EXIST) {
            console.log("---------- input token ERC721 id only check exist");
            return true;
        } else if (self.erc == TOKEN_ERC_ERC1155 && idRequired == TOKEN_TEMPLATE_ID_REQUIRED_EXIST && amountRequired == TOKEN_TEMPLATE_AMOUNT_REQUIRED_EXIST) {
            console.log("---------- input token ERC1155 id or amount only check exist");
            return true;
        } else if ((self.erc == TOKEN_ERC_ERC20 || self.erc == TOKEN_ERC_COIN) && amountRequired == TOKEN_TEMPLATE_AMOUNT_REQUIRED_EXIST) {
            console.log("---------- input COIN / token ERC20 amount only check exist");
            return true;
        }
        return false;
    }

    function checkTokenRequiredNone(TokenTemplate memory self) internal view returns (bool){
        uint8 idRequired = getIdRequired(self);
        uint8 amountRequired = getAmountRequired(self);
        if (self.erc == TOKEN_ERC_ERC721
            && idRequired == TOKEN_TEMPLATE_ID_REQUIRED_NONE) {
            console.log("---------- input token ERC721 id only check none");
            return true;
        } else if (self.erc == TOKEN_ERC_ERC1155 && idRequired == TOKEN_TEMPLATE_ID_REQUIRED_NONE && amountRequired == TOKEN_TEMPLATE_AMOUNT_REQUIRED_NONE) {
            console.log("---------- input token ERC1155 id or amount only check none");
            return true;
        } else if ((self.erc == TOKEN_ERC_ERC20 || self.erc == TOKEN_ERC_COIN)
            && amountRequired == TOKEN_TEMPLATE_AMOUNT_REQUIRED_NONE) {
            console.log("---------- input COIN / token ERC20 amount only check none");
            return true;
        }
        return false;
    }


    function tokenCheckMatchStdInput(uint256 tokenSlotIndex, TokenTemplate memory stdToken, Token memory memToken) internal {
        console.log("-----tokenMatchStdInput stdToken", stdToken.token);
        console.log("-----tokenMatchStdInput memToken", memToken.token);
        console.log("-----tokenMatchStdInput erc", ercToString(memToken.erc));

        if (memToken.token != stdToken.token) {
            require(false, S.cs2("index stdToken.addr == memToken.addr", S.u2s(tokenSlotIndex)));
        }
        if (memToken.erc != stdToken.erc) {
            require(false, S.cs2("index stdToken.erc == memToken.erc", S.u2s(tokenSlotIndex)));
        }

        uint8 idRequired = getIdRequired(stdToken);
        uint8 amountRequired = getAmountRequired(stdToken);

        // uint256 stdIdIndex = stdToken.getIdIndex();
        uint256 stdIdListLength = getIdListLength(stdToken);
        console.log("-------- tokenMatchStdInput stdIdListLength", stdIdListLength);

        console.log("-----tokenMatchStdInput memToken.id", memToken.id);
        console.log("-----tokenMatchStdInput memToken.amount", memToken.amount);

        if (stdToken.erc == TOKEN_ERC_ERC1155) {
            if ((idRequired == TOKEN_TEMPLATE_ID_REQUIRED_FALSE && amountRequired == TOKEN_TEMPLATE_AMOUNT_REQUIRED_FALSE)) {
                require((memToken.id == 0 && memToken.amount == 0 || memToken.id > 0 && memToken.amount > 0), "ERC1155 must idRequired == FALSE && amountRequired == FALSE, id = 0 && amount = 0 || id > 0 && amount > 0");
            } else if (idRequired == TOKEN_TEMPLATE_ID_REQUIRED_TRUE && amountRequired == TOKEN_TEMPLATE_AMOUNT_REQUIRED_TRUE) {
                require(memToken.id > 0 && memToken.amount > 0, "ERC1155 must idRequired == TRUE && amountRequired == TRUE, id > 0 && amount > 0");
            } else if (idRequired == TOKEN_TEMPLATE_ID_REQUIRED_EXIST && amountRequired == TOKEN_TEMPLATE_AMOUNT_REQUIRED_EXIST) {
                require(memToken.id > 0 && memToken.amount > 0, "ERC1155 must idRequired == EXIST && amountRequired == EXIST, id > 0 && amount > 0");
            } else if (idRequired == TOKEN_TEMPLATE_ID_REQUIRED_NONE && amountRequired == TOKEN_TEMPLATE_AMOUNT_REQUIRED_NONE) {
                require(memToken.id > 0 && memToken.amount > 0, "ERC1155 must idRequired == NONE && amountRequired == NONE, id > 0 && amount > 0");
            } else if (idRequired == TOKEN_TEMPLATE_ID_REQUIRED_MOUNTING && amountRequired == TOKEN_TEMPLATE_AMOUNT_REQUIRED_MOUNTING) {
                require(memToken.id > 0 && memToken.amount > 0, "ERC1155 must idRequired == MOUNTING && amountRequired == MOUNTING, id > 0 && amount > 0");
            } else {
                require(false, "ERC1155 id.Required amt.Required state not matched");
            }
        }

        if (idRequired == TOKEN_TEMPLATE_ID_REQUIRED_TRUE || idRequired == TOKEN_TEMPLATE_ID_REQUIRED_EXIST || idRequired == TOKEN_TEMPLATE_ID_REQUIRED_NONE) {
            if (stdIdListLength > 0) {
                require(searchId(stdToken, memToken.id) >= 0, "memToken.id not exist in stdToken");
            } else {
                uint256[] memory stdIdRange = getIdRange(stdToken);
                console.log("-----tokenMatchStdInput TRUE EXIST NONE stdIDRange0", stdIdRange[0]);
                console.log("-----tokenMatchStdInput TRUE EXIST NONE stdIDRange1", stdIdRange[1]);

                if (stdIdRange[0] != 0 || stdIdRange[1] != 0) {
                    if (stdIdRange[0] > memToken.id || memToken.id > stdIdRange[1]) {
                        require(stdIdRange[0] <= memToken.id && memToken.id <= stdIdRange[1],
                            S.cs3("id.TRUE || id.EXIST index stdToken.id <= memToken.id <= stdToken.idEnd", S.u2s(tokenSlotIndex), S.u2s(idRequired)));
                    }
                }
            }
        } else if (idRequired == TOKEN_TEMPLATE_ID_REQUIRED_FALSE) {
            if (stdIdListLength > 0) {
                require(memToken.id == 0 || searchId(stdToken, memToken.id) >= 0, "memToken.id not exist in stdToken");
            } else {
                uint256[] memory stdIdRange = getIdRange(stdToken);
                console.log("-----tokenMatchStdInput FALSE stdIDRange0", stdIdRange[0]);
                console.log("-----tokenMatchStdInput FALSE stdIDRange1", stdIdRange[1]);

                if (stdIdRange[0] != 0 || stdIdRange[1] != 0) {
                    if (stdIdRange[0] > memToken.id || memToken.id > stdIdRange[1]) {
                        require(memToken.id == 0 || stdIdRange[0] <= memToken.id && memToken.id <= stdIdRange[1],
                            S.cs3("id.FALSE index memToken.id == 0 || stdToken.id <= memToken.id <= stdToken.idEnd", S.u2s(tokenSlotIndex), S.u2s(idRequired)));
                    }
                }
            }
        }

        if (amountRequired == TOKEN_TEMPLATE_AMOUNT_REQUIRED_TRUE || amountRequired == TOKEN_TEMPLATE_AMOUNT_REQUIRED_EXIST || amountRequired == TOKEN_TEMPLATE_AMOUNT_REQUIRED_NONE) {
            uint256[] memory stdAmountRange = getAmountRange(stdToken);

            console.log("-----tokenMatchStdInput TRUE EXIST NONE stdAmountRange0", stdAmountRange[0]);
            console.log("-----tokenMatchStdInput TRUE EXIST NONE stdAmountRange1", stdAmountRange[1]);

            if (stdAmountRange[0] > memToken.amount || memToken.amount > stdAmountRange[1]) {
                require(stdAmountRange[0] <= memToken.amount && memToken.amount <= stdAmountRange[1],
                    S.cs3("amt.TRUE || amt.EXIST index stdToken.amount <= memToken.amount <= stdToken.amountEnd",
                    S.u2s(tokenSlotIndex), S.u2s(amountRequired)));
            }
        } else if (amountRequired == TOKEN_TEMPLATE_AMOUNT_REQUIRED_FALSE) {
            uint256[] memory stdAmountRange = getAmountRange(stdToken);

            console.log("-----tokenMatchStdInput FALSE stdAmountRange0", stdAmountRange[0]);
            console.log("-----tokenMatchStdInput FALSE stdAmountRange1", stdAmountRange[1]);

            if (stdAmountRange[0] > memToken.amount || memToken.amount > stdAmountRange[1]) {
                require(memToken.amount == 0 || stdAmountRange[0] <= memToken.amount && memToken.amount <= stdAmountRange[1],
                    S.cs3("amt.FALSE index memToken.amount == 0 || stdToken.amount <= memToken.amount <= stdToken.amountEnd",
                    S.u2s(tokenSlotIndex), S.u2s(amountRequired)));
            }
        }

    }

}
