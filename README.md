# GoldBeauty - Smart Beauty Assistant

GoldBeauty is an innovative digital assistant that transforms the beauty industry experience for small businesses through a sophisticated Telegram mini-app platform.

## 🌟 Key Features

- **Personalized Beauty Recommendations**: AI-powered suggestions based on customer history and preferences
- **Smart Loyalty Program**: Earn tokens for salon visits and services
- **Voice-Activated Payments**: Seamless payment processing through voice commands
- **Credit Card On-ramp**: Pay with credit cards while earning reward tokens
- **Flexible Financial Management**: Business owners can off-ramp revenue or stake earnings
- **Gasless Transactions**: Sponsored transactions for frictionless user experience
- **AI-Powered Insights**: OpenAI Agent integration for intelligent recommendations
- **Service Marketplace**: Browse and book additional services using reward tokens

## 🤖 Telegram Bot Commands

Connect with our official bot [@GoldBeautyBot](https://t.me/GoldBeautyBot) to access the following commands:

- `/appointment` - Find and schedule next available appointment
- `/points` - Check current reward token balance
- `/redeem` - Open mini-app to view rewards and manage appointments

## 💼 Business Features

- **Revenue Management**: Flexible options for handling earnings
- **Staking Capabilities**: Grow capital through earnings staking
- **Customer Analytics**: Track preferences and optimize services
- **Promotion Tools**: Create and manage exclusive offers

## 👤 Customer Experience

1. **Easy Onboarding**
   - Connect via social login
   - Automatic wallet creation
   - Gasless transactions

2. **Rewards System**
   - Earn tokens for services
   - Redeem for special offers
   - Track points through bot

3. **Payment Options**
   - Credit card payments
   - Voice-activated transactions
   - Reward token redemption

## 🔒 Security Features

- Secure authentication flow
- Protected wallet management
- Private data handling
- Real-time transaction monitoring

## 💡 Technical Integration

- BNB Chain integration
- Dynamic framework implementation
- OpenAI Agent integration
- Real-time currency conversion
- Transaction template system

## 🚀 Smart contract

### CIRCLEUSD.sol
Deployed at [0x008aD87EC78FDf57Fa3E84649cc7242eCDbDb8FE](https://testnet.bscscan.com/address/0x008aD87EC78FDf57Fa3E84649cc7242eCDbDb8FE)

This is an ERC20 token contract that simulates USDC (USD Circle). Its main features are:

- Inherits from OpenZeppelin's ERC20 implementation
- Token name: "CIRCLE USD"
- Symbol: "USDC"
- Decimals: 6 (same as real USDC)
- Includes a public mint function (note: this is for testing only, as in a real token it should be restricted)

### GlamBot.sol
Deployed at [0x691db0931d5c60bedb326f6d7552466a15d67797](https://testnet.bscscan.com/address/0x691db0931d5c60bedb326f6d7552466a15d67797)

This is a more complex contract that implements a loyalty system with points and coupons for merchants. Its main features are:

#### Data Structures
- **CouponMetadata**: Stores coupon information (name, description, required points, status)
- **MerchantMetadata**: Merchant data (name, active status)
- **TicketCouponMetadata**: Represents coupons in user wallets

#### Main Features
1. **Points System**
   - Ratio: 10 dollars = 1 point
   - Points have 2 decimals
   - Points are earned when paying merchants with USDC token

2. **Merchant System**
   - Merchants can activate/deactivate themselves
   - Registration by unique name
   - Can create and manage coupons

3. **Coupon System**
   - Merchants can create coupons redeemable for points
   - Coupons can be deactivated
   - Users can exchange points for coupons
   - Coupons can be redeemed at merchants

#### Security
- Uses OpenZeppelin's ReentrancyGuard
- Implements modifiers to verify active merchants
- Custom error handling with specific messages

#### Core Functions
1. `payToMerchant`: Allows payments to merchants and earning points
2. `makeCoupon`: Merchants can create coupons
3. `changePointsToCoupon`: Users can exchange points for coupons
4. `redeemCoupon`: Allows using acquired coupons
5. Multiple query functions to view points, coupons, and merchant statuses

#### Integrations
- Integrates with an ERC20 token (USDC in this case) for payments
- Uses OpenZeppelin standard patterns for security

#### System Flow
1. Users pay merchants with USDC
2. They receive points for their purchases
3. Points can be exchanged for coupons offered by merchants
4. These coupons can be redeemed at the establishments

## 📱 Mini-App Features

- Service booking
- Payment processing
- Reward management
- Appointment tracking
- Transaction history
- Marketplace access

## 🔒 Security & Trust

- **Seamless Authentication**: Secure login through Telegram's trusted platform
- **Privacy-First Design**: Minimal data collection with industry-leading security standards
- **Protected Asset Management**: Advanced key management and wallet security
- **Real-time Transaction Monitoring**: Continuous security oversight

## 💫 Technical Excellence

- **Advanced Wallet Architecture**: Secure key storage and management system
- **Meta-Transaction Support**: Gasless operations through account abstraction
- **Telegram Mini App Integration**: Native-feeling interface within Telegram
- **Smart Contract Safety**: Audited contracts with fail-safe mechanisms
- **Cross-Chain Compatibility**: Ready for multi-chain expansion

## 💡 Technical Integration

- BNB Chain integration
- Dynamic framework implementation
- OpenAI Agent integration
- Real-time currency conversion
- Transaction template system
# Figma UX Design

[Figma Design](https://www.figma.com/design/dL8ErFiI4vc8XD3YavT6LJ/Gold-Beauty-BKK?node-id=0-1&t=FQqVpNVjiKuuGYNC-1)
## 🔗 Getting Started

[Installation and setup instructions to be added]

## 📄 License

[License information to be added]
