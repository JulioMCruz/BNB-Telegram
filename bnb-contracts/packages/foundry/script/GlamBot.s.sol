// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {GlamBot} from "../src/GlamBot.sol";
import {CIRCLEUSD} from "../src/CIRCLEUSD.sol";

contract GlamBotScript is Script {
    GlamBot public c;
    CIRCLEUSD public token;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        //token = new CIRCLEUSD();

        c = new GlamBot(0x008aD87EC78FDf57Fa3E84649cc7242eCDbDb8FE);

        vm.stopBroadcast();
    }
}
