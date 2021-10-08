# TEZEX Changemaker Satellites

Tezex is a non-custodial, permissionless, decentralized exchange for XTZ and Tezos FA-standard tokens (FA-1.2, FA-2.0, etc.), as well as a cross-chain bridge between Tezos assets and assets of other blockchains (Ethereum, Bitcoin, etc.)

Tezex **liquidity providers** are called 'Changemakers', who operate the changemaker 'satellites' which facilitate swaps with the requesting parties. This repo contains 3 bots, any one or combination of which can comprise a changemaker's own particular satellite. To facilitate swaps however, only the first 2 (bot, and bot-tezos-swap) are relevant. The 3rd bot (redeem-bot) helps out other changemakers by constantly scanning for unredeemed swaps and redeeming those swaps as needed.



CROSS-CHAIN SWAPS (e.g. TEZOS TO ETHEREUM, OR ETHEREUM TO TEZOS):
- `bot` : this is the cross chain bot, to supply liquidity to ethereum<->tezos token pairs use this bot.

TEZOS ONLY SWAPS (e.g. XTZ TO USDTZ):
- `bot-tezos-swap` : this is the pure tezos swap bot, to supply liquidity to only tezos<->tezos token pairs use this bot.
Your changemaker satellite can run one or both of these bots. 

OTHER:
- `redeem-bot` : this bot redeems all completed swaps that may have been abandoned due to network issues or some other problem on the changemaker side. Running this bot helps the network by being a kind neighbor to other changemakers. 
