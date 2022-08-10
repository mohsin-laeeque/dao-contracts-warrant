// SPDX-License-Identifier: Proprietary
pragma solidity 0.7.5;

interface ITreasury {
    function deposit( uint _amount, address _token, uint _fee ) external returns ( uint );
    function valueOf( address _token, uint _amount ) external view returns ( uint value_ );
    function convertToken( address _token, uint _amount ) external view returns ( uint value_ );
    function getTotalReserves() external view returns (uint);
}