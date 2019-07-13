<div align="center">
    <br />
    <img src="../resources/logo.png">
    <br />
    <br />
    <p><strong>Go Fast, Go Nimble</strong></p>
</div>
# Simplfying the tasks and breaking down the assignment
#### *Final Goal: create fully functional taxi company*
---
## 1.Client Side:
### - Packages and APIS
- React(typescript) [DOCS](https://reactjs.org/docs/getting-started.html)
- SASS [DOCS](https://sass-lang.com/documentation)
- GoogleMaps API and Google Navigation API [DOCS](https://developers.google.com/maps/documentation/javascript/tutorial)
- BONUS:react-i18n [DOCS](https://react.i18next.com/)
- BONUS:react-bootstrap [DOCS](https://react-bootstrap.github.io/components/alerts)

### - What the Client Side should do:
 * Register and Login using mail/OAUTH/FACEBOOK
 * Assign a phone number to get calls from ordered taxi driver
 * Apply for a Taxi Driver account
 * Supply Payment information if wanted(customer - billing account, driver - bank account for billing)
 * see past orders
 * see if there is any free rides or coupons
 * get in contact with the taxi company
 * pre order a taxi
 * build simple profile if wanted
 * order a taxi(private,van,special,delivery)
 * pay with credit card
## 2. Server Side:
 ### - Packages and APIS
 * Server built with nestJS Framework [DOCS](https://docs.nestjs.com/)
 * Mongoose [DOCS](https://mongoosejs.com/docs/)
 * MongoDB [DOCS](https://docs.mongodb.com/?_ga=2.142915957.1134151236.1562676401-238157055.1562676401)
 * Bull - Queue Package [DOCS](https://github.com/OptimalBits/bull)
 ### - What the Server side should do:
 * queue all the idle workers(taxi drivers)
 * queue all taxi orders
 * send taxi orders to the relevant drivers(depends on distance)
 * register users(to the db and save all their data, drivers and users in same collection)
 * register idle drivers to the queue
 * remove working drivers from the queue
 * remove taxi order if the taxi arrived and the drive accepted by the driver or automated by distance between order location to taxi driver location
 * draw for the driver the route to the customer
 * draw for the driver the route to customers destination
 * draw for the customer where is the taxi that is going to pick him up

