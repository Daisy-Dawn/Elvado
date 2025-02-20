# TOKEN ROUTES

`(/<route>, “method”, [param | body])`

## GET ROUTES

### GET TOKENS

```
/get-tokens
```

Returns all tokens created.

### SEARCH

```
/search/<search>
```

Returns tokens that are found by the search.

```typescript
data: {
  results: searchResults;
}
```

### CHECK TOKEN

```
/check-token/<ticker>
```

Checks for the existence of `ticker`. The idea is to know which `ticker`s do not exist so they can be used. If `ticker` exists, `400` is returned, else `200` is returned.

### GET TOKENS 24H

```
/get-tokens-24h
```

Returns all tokens created within the past 24 hours from the moment of request.

### GET OI

OI: Open Interest

```
/get-oi/<ticker>
```

Returns the open interest for `ticker`.

```typescript
data: {
  openInterest: value;
}
```

### GET LISTINGS

```
/get-listings
```

Returns tokens listed on the trading exchange. These tokens have been created and have passed a couple of tresholds to be listed on the exchange.

```typescript
data: {
  tokens: Tokens[];
}
```

## POST ROUTES

### CREATE TOKEN

```
/create-token
```

#### JSON

```typescript
body = JSON.stringify({
  name: "Name",
  ticker: "TIC",
  description: "Description",
  leverate: <number>,
  creator: "<address>",
});
```

Creates a new token.
Returns status `400` if token exists or `200` if token was created successfully.
