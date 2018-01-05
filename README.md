# tacticalmastery-api
API for TacticalMastery site.

## Authentication

API users are required to authenticate and receive a token before making API calls. Access is based on client ID. Tokens expire after 30 minutes.

URL: https://starlightgroup.auth0.com/oauth/token

#### Fields

All fields are required.

* client_id
* client_secret
* grant_type: 'client_credentials'
* audience: 'https://api.tacticalmastery.com'

#### Response

A successful response has the following format:

```javascript
{ "access_token": "12525f4efgds4d6f4gedfgvd" }
```

An error has the following format:

```javascript
{ "message": "Forbidden" }
```

A later request with an invalid or missing Bearer token has the following response:

```javascript
{ "message": "Missing or invalid token" }
```


### **All requests except the initial auth request must have a Bearer token.**

These requests should have the Authorization: Bearer < token > header.

## /lead

The /lead endpoint allows the creation of leads.

**All requests except the initial auth request must have a Bearer token.**

### POST

A POST request against the /lead endpoint creates a new lead.

#### Fields

All fields are required. POST and PUT request need the Content-Type: application/x-www-form-urlencoded header and the body must be a URL-encoded string.

* firstName
* lastName
* emailAddress
* phoneNumber


#### Response

A successful response has the following format:

```javascript
{
    "result": "SUCCESS",
    "orderId": "CA123456"
}
```

An error has the following format:

```javascript
{
    "error": "Error Message",
    "referrer": "TM"
}
```

## /order

The /order endpoint allows the creation, editing, and retrieval of orders.

**All requests except the initial auth request must have a Bearer token.**

### POST

A POST request against the /order endpoint creates a new order from an existing lead.

#### Fields

All fields are required. POST and PUT request need the Content-Type: application/x-www-form-urlencoded header and the body must be a URL-encoded string.

* address1
* address2
* cardMonth
* cardNumber
* cardYear
* city
* emailAddress
* firstName
* lastName
* orderId
* phoneNumber
* postalCode
* productId
* productQty
* state


#### Response

A successful response had the following format:

```javascript
{
    "result": "SUCCESS",
    "orderId": "CA123456"
}
```

An error has the following format:

```javascript
{
    "error": "Error Message",
    "referrer": "TM"
}
```

### PUT

A PUT request against the /order endpoint adds additional items to an existing order.

#### Fields

All fields are required. POST and PUT request need the Content-Type: application/x-www-form-urlencoded header and the body must be a URL-encoded string.

* orderId
* productId
* productQty

#### Response

A successful response had the following format:

```javascript
{
    "result": "SUCCESS",
    "orderId": "CA123456"
}
```

An error has the following format:

```javascript
{
    "error": "Error Message",
    "referrer": "TM"
}
```

### GET /order/:id

A GET request against the /order endpoint returns all the data about an order.

#### Fields

All fields are required.

* id (as URL parameter)

#### Response

A successful response had the following format:

```javascript
{
    "result": "SUCCESS",
    "message": {
            "totalResults": 1,
            "resultsPerPage": 25,
            "page": 1,
            "data": [
                {
                    "orderId": "7B83FF8095",
                    "clientOrderId": "7B83FF8095",
                    "shipCarrier": null,
                    "shipMethod": null,
                    "dateCreated": "2016-08-24 14:22:33",
                    "dateUpdated": "2016-08-24 14:22:33",
                    "orderType": "NEW_SALE",
                    "orderStatus": "COMPLETE",
                    "reviewStatus": null,
                    "totalAmount": "1.00",
                    "campaignName": "Widgets",
                    "customerId": 1266,
                    "name": "Brook Sanchez-Scott",
                    "emailAddress": "BrookSanchez-Scott19661@phoneyemail.com",
                    "phoneNumber": "3336158349",
                    "firstName": "Brook",
                    "lastName": "Sanchez-Scott",
                    "companyName": null,
                    "address1": "6616 Palm Springs Drive",
                    "address2": null,
                    "city": "Atlanta",
                    "state": "AL",
                    "country": "US",
                    "postalCode": "54108",
                    "shipFirstName": "Brook",
                    "shipLastName": "Sanchez-Scott",
                    "shipCompanyName": null,
                    "shipAddress1": "6616 Palm Springs Drive",
                    "shipAddress2": null,
                    "shipCity": "Atlanta",
                    "shipState": "AL",
                    "shipCountry": "US",
                    "shipPostalCode": "54108",
                    "paySource": "CREDITCARD",
                    "cardType": "TESTCARD",
                    "cardLast4": "0000",
                    "cardExpiryDate": "2023-02-28 00:00:00",
                    "achRoutingNumber": null,
                    "achAccountNumber": null,
                    "couponCode": null,
                    "agentUserId": 3,
                    "price": "1.00",
                    "baseShipping": "0.00",
                    "voiceLogNumber": null,
                    "discountPrice": "0.00",
                    "salesTax": "0.00",
                    "shipUpcharge": null,
                    "shipProfileId": null,
                    "isDeclineSave": 1,
                    "ipAddress": null,
                    "sourceId": null,
                    "affId": null,
                    "sourceValue1": null,
                    "sourceValue2": null,
                    "sourceValue3": null,
                    "sourceValue4": null,
                    "sourceValue5": null,
                    "currencySymbol": "$",
                    "campaignId": 1,
                    "totalDiscount": "0.00",
                    "items": {
                        "3": {
                            "productId": "3",
                            "name": "Exciting Widget Parts",
                            "qty": "1",
                            "shipping": "0.00",
                            "price": "1.00",
                            "purchaseId": "ABE23B5E8A",
                            "purchaseStatus": "ACTIVE",
                            "detailedStatus": "",
                            "nextBillDate": "2016-09-24",
                            "orderItemId": "988"
                        }
                    },
                    "fulfillments": [
                        {
                            "fulfillmentId": 421,
                            "fulfillmentHouseId": null,
                            "company": "System Fulfillment",
                            "clientFulfillmentId": "6FEC0DBA37",
                            "trackingNumber": null,
                            "dateShipped": null,
                            "dateDelivered": null,
                            "shipCarrier": null,
                            "shipMethod": null,
                            "responseText": null,
                            "status": "HOLD",
                            "dateReturned": null,
                            "rmaNumber": null,
                            "items": [
                                {
                                    "fulfillmentItemId": "678",
                                    "name": "Exciting Widget Parts",
                                    "sku": "WGT",
                                    "qty": "1",
                                    "status": "HOLD",
                                    "rmaNumber": ""
                                }
                            ],
                            "dateCreated": "2016-08-30 11:05:21"
                        }
                    ]
                }
            ],
            "params": null,
            "errors": null,
            "sortBy": "dateCreated",
            "sortDir": 1,
            "queryArgs": {
                "page": 1,
                "sortDir": 1,
                "resultsPerPage": 25,
                "sortBy": "dateCreated",
                "orderId": "7B83FF8095",
                "dateRangeType": "dateCreated"
            }
        }
}
```

An error has the following format:

```javascript
{
    "error": "Error Message",
    "referrer": "TM"
}
```