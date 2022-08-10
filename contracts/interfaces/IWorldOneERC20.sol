// SPDX-License-Identifier: Proprietary
pragma solidity 0.7.5;
import "./IERC20Mintable.sol";
import "./IERC20.sol";


interface IWorldOneERC20 is IERC20Mintable, IERC20 {
    function burnFrom(address account_, uint256 amount_) external;
}