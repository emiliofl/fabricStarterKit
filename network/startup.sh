#!/bin/bash

export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_MSPCONFIGPATH=/root/fabric/fabricStarterKit/network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051
export FABRIC_CFG_PATH=/root/fabric/fabric-samples/config