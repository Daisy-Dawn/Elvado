# ROUTES

`(/<route>, “method”, [param | body])`

## `GET` ROUTES

### Get Latest Trades

```
/get-latest-trades/<market>/<size>
```

Returns `size` number of latest trades for `market`. `market` is the ticker for the asset you want to fetch, e.g. `"btc"`. We're trying to make sure that no two assets have the same ticker. The ticker also **MUST** be in lower case.

### Get Long Orders

```
/get-long-orders/<market>
```

Returns all long orders placed on the `market` asset.

### Get Order

```
/get-order/<orderId>
```

Returns the data for order `orderId`.

### Ger Orders

```
/get-orders/<market>
```

Returns all long and short orders placed on the `market` asset.

### Get Position

```
/get-position/<positionId>
```

Returns the data for position `positionId`.

### Get Short Orders

```
/get-short-orders/<market>
```

Returns all the short orders placed on the `market` asset.

### Get Users Positions

```
/get-users-positions/<address>
```

Users are identified on the platform by their wallet addresses, `address`. A call to this route returns all the positions opened by the user, `address`.

### Get Users Open Orders

```
/get-users-open-orders/<address>
```

Returns the orders opened by `address`. <br>
NB: Orders and positions are not the same thing. A position is a filled order.

### Get Users Filled Orders

```
/get-users-filled-orders/<address>
```

Returns the orders placed by `address` that have been filled.

### Get Market Information

```
/get-market-information/<market>
```

Returns information about an asset based on the trade activities on the platform.

### Get Funding Rate Time Left

```
/get-funding-rate-time-left
```

Returns the number of milliseconds to the next funding rate time. The returned data is to be counted down.

### Get Users Orders Range

```
/get-users-orders-range/<address>/<range: "day" | "week" | "month">
```

Returns all the orders placed by `address` within a specified `range`. `range` can be `"day"`, `"week"`, or `"month"`. The value is `"day"` by default.

## `POST` ROUTES

### Submit Order

```
/submit-order
```

#### JSON

```typescript
type Types = 'limit' | 'market'
type PositionTypes = 'long' | 'short'
type LeverageTypes = 'fixed' | 'dynamic'

type Order = {
    positionType: PositionTypes
    type: Types
    opener: string
    market: string
    margin: number
    leverage: number
    leverageType: LeverageTypes // Unchecked, anyone can be passed for now.
    fee: number
    quantity: number
    price: number
    tp: number | null
    sl: number | null
    marketPrice: number
}

body = JSON.stringify({
    userId: 'anything', // Unchecked, any string value can be used.
    order: Order,
})
```

Submits a new order. Returns status `200` if an order is created and `500` if otherwise.

### Cancel Order

```
/cancel-order
```

#### JSON

```typescript
body = JSON.stringify({
    orderId: 'orderId',
})
```

Cancels or deletes **an unfilled** order. If an order has been partially filled, it won't be deleted.
Returns status `404` if order is not found, `403` is the order has been partially filled, `500` if the order's margin can be re-added to the user's balance, and `200` if deletion was successful.

### Update Order

```
/update-order
```

#### JSON

```typescript
body = JSON.stringify({
    orderId: 'orderId',
    newOrder: Order, // Type specified above.
})
```

Replaces `orderId`'s data with `newOrder`'s data.
Returns status `404` if order is not found, `403` is the order has been partially filled, `500` if the order's margin can be re-added to the user's balance, and `200` if update was successful.

### Close Position

```
/close-position
```

#### JSON

```typescript
body = JSON.stringify({
    owner: '<address>',
    positionId: 'positionId',
})
```

Closes position `positionId`.
Returns status `404` if position is not found, `403` is the position is not owned by `owner`, and `200` if closure was successful.

### Add TP/SL

```
/add-tp-sl
```

#### JSON

```typescript
body = JSON.stringify({
  owner: "<address>",
  positionId: "positionId",
  tp: <number>,
  sl: <number>
});
```

Adds TP/SL to a position.
Returns status `200` if addition was successful and another status code if otherwise.

### Cancel All Orders

```
/cancel-all-orders
```

#### JSON

```typescript
body = JSON.stringify({
    owner: '<address>',
})
```

Cancels all unfilled orders submitted by `owner`.
Returns status `404` if no orders are found, `500` if the order's margin can be re-added to the user's balance, and `200` if deletion was successful.

### Close All Positions

```
/close-all-positions
```

#### JSON

```typescript
body = JSON.stringify({
    owner: '<address>',
})
```

Closes all positions opened by `owner`.
Returns status `404` if no positions are found, and `200` if closure was successful.

//updates
