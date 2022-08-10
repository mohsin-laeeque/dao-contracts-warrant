// SPDX-License-Identifier: Proprietary
pragma solidity 0.7.5;

interface IWarrantDepository {
    function valueOf( uint _amount ) external view returns ( uint );
}