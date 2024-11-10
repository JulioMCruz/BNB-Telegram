// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract GlamBot is ReentrancyGuard {
    error InactiveMerchant();
    error ZeroAmount();
    error amountInsufficient();
    error InactiveCoupon();

    struct CouponMetadata {
        string name;
        string description;
        uint256 pointsToRedeem;
        bool isActive;
    }

    struct MerchantMetadata {
        string name;
        bool isActive;
    }

    struct TicketCouponMetadata {
        uint256 couponId;
        address merchant;
        string name;
        string description;
        bool isActive;
    }

    uint8 constant POINTS_DECIMALS = 2;
    uint8 constant DOLLARS_PER_POINT = 10;

    IERC20 token;

    mapping(address => uint256) balancesOfPoints;
    mapping(address => CouponMetadata[]) coupons;
    mapping(address => MerchantMetadata) merchant;
    mapping(string => address) merchantNameToAddress;

    mapping(address user => mapping(address merchant => TicketCouponMetadata[]))
        public walletCoupons;

    modifier IsActiveMerchant(address _merchant) {
        if (!merchant[_merchant].isActive) revert InactiveMerchant();
        _;
    }

    modifier IsMerchant() {
        if (!merchant[msg.sender].isActive) revert InactiveMerchant();
        _;
    }

    constructor(address _token) {
        token = IERC20(_token);
    }

    function payToMerchant(
        address _merchant,
        uint256 _amount
    ) external nonReentrant IsActiveMerchant(_merchant) returns (uint256) {
        if (_amount == 0) revert ZeroAmount();

        // Transferir tokens
        require(
            token.transferFrom(msg.sender, _merchant, _amount),
            "Transfer failed"
        );

        // Calcular puntos (con 2 decimales)
        uint256 points = (_amount * 10 ** POINTS_DECIMALS) /
            (DOLLARS_PER_POINT * 10 ** 18);
        balancesOfPoints[msg.sender] += points;
        return points;
    }

    function makeCoupon(
        string memory _name,
        string memory _description,
        uint256 _pointsToRedeem
    ) external nonReentrant IsMerchant returns (uint256) {
        coupons[msg.sender].push(
            CouponMetadata({
                name: _name,
                description: _description,
                pointsToRedeem: _pointsToRedeem,
                isActive: true
            })
        );
        return coupons[msg.sender].length - 1;
    }

    function deactivateCoupon(
        uint256 _couponId
    ) external nonReentrant IsMerchant returns (bool) {
        coupons[msg.sender][_couponId].isActive = false;
        return true;
    }

    function changePointsToCoupon(
        uint256 _couponId,
        address _merchant
    ) external nonReentrant returns (bool) {
        CouponMetadata storage coupon = coupons[msg.sender][_couponId];
        if (balancesOfPoints[msg.sender] < coupon.pointsToRedeem)
            revert amountInsufficient();
        if (!coupon.isActive) revert InactiveCoupon();

        balancesOfPoints[msg.sender] -= coupon.pointsToRedeem;

        walletCoupons[msg.sender][_merchant].push(
            TicketCouponMetadata({
                couponId: _couponId,
                merchant: _merchant,
                name: coupon.name,
                description: coupon.description,
                isActive: true
            })
        );

        return true;
    }

    function redeemCoupon(
        address _merchant,
        uint256 _couponId
    ) external nonReentrant returns (bool) {
        TicketCouponMetadata storage ticket = walletCoupons[msg.sender][
            _merchant
        ][_couponId];
        if (!ticket.isActive || !merchant[_merchant].isActive) {
            walletCoupons[msg.sender][_merchant][_couponId].isActive = false;
            return false;
        }
        ticket.isActive = false;
        return true;
    }

    function activateMerchant(
        string memory _name
    ) external nonReentrant returns (bool) {
        if (merchantNameToAddress[_name] != address(0)) return false;
        merchant[msg.sender] = MerchantMetadata({name: _name, isActive: true});
        merchantNameToAddress[_name] = msg.sender;
        return true;
    }

    function deactivateMerchant()
        external
        nonReentrant
        IsMerchant
        returns (bool)
    {
        delete merchantNameToAddress[merchant[msg.sender].name];
        delete merchant[msg.sender];
        return true;
    }

    function getPoints(address _user) external view returns (uint256) {
        return balancesOfPoints[_user];
    }

    function getMerchantCoupons(
        address _merchant
    ) external view returns (CouponMetadata[] memory) {
        return coupons[_merchant];
    }

    function getWalletCoupons(
        address _user,
        address _merchant
    ) external view returns (TicketCouponMetadata[] memory) {
        return walletCoupons[_user][_merchant];
    }

    function getMerchant(
        address _merchant
    ) external view returns (MerchantMetadata memory) {
        return merchant[_merchant];
    }

    function getCoupon(
        address _merchant,
        uint256 _couponId
    ) external view returns (CouponMetadata memory) {
        return coupons[_merchant][_couponId];
    }

    function getWalletCoupon(
        address _user,
        address _merchant,
        uint256 _couponId
    ) external view returns (TicketCouponMetadata memory) {
        return walletCoupons[_user][_merchant][_couponId];
    }

    function getMerchantAddress(string memory _name)
        external
        view
        returns (address)
    {
        return merchantNameToAddress[_name];
    }

    function getMerchantName(address _merchant) external view returns (string memory) {
        return merchant[_merchant].name;
    }

    function getTokenAddress() external view returns (address) {
        return address(token);
    }
}
