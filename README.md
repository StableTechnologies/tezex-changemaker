# TEZEX Changemaker Bot

Tezex is a non-custodial, permissionless, decentralized exchange for XTZ and Tezos FA-standard tokens (FA-1.2, FA-2.0, etc.), as well as a cross-chain bridge between Tezos assets and assets of other blockchains (Ethereum, Bitcoin, etc.)

Tezex liquidity providers are called 'Changemakers', who operate the 'changemaker bots' which facilitate swaps with the requesting parties. This repo contains 3 bots:

- `bot` : this is the cross chain bot, to supply liquidity to ethereum<->tezos token pairs use this bot.
- `bot-tezos-swap` : this is the pure tezos swap bot, to supply liquidity to only tezos<->tezos token pairs use this bot.
- `redeem-bot` : this bot redeems all completed swaps that may have been abandoned due to network issues or some other problem on the changemaker side.
