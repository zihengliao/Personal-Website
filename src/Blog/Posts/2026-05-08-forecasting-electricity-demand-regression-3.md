---
title: "Forecasting Electricity Demand Using Regression Pt.3"
date: "2026-05-08"
---

## Forecasting Electricity Demand Using Regression Pt.3

I can't believe there is a part 3 to this as well and from how things are looking, there is likely going to be a part 4 as well.

Last article I was trying to forecast peak electricity demand in December, but I've adjusted the problem I'm trying to solve since.

For this article, I want to be forecasting electricity demand for the next 5 minutes.

Building on top of what we covered in the previous article, in today's regression model I have decided to add more variables to make hopefully better and more informed decisions.

I have downloaded the Victorian total electricity demand data from AEMO starting from 01/10/2021 as this is when the data started recording demand on a 5 minute basis.

I have also split the data into training and testing data. Training data has been split at the 01/01/2025 mark. Everything before this date is used for training, and everything after is used for testing.

Below are the variables I used and their corresponding p-values. We've discussed what this means and how to interpret this in the previous article (part 2).

<csvtable src="/assets/blog/2026-05-08-forecasting-electricity-demand-regression-3/ols_regression_coefficients.csv" ></csvtable>

To summarise these variables, I have grouped them into categories.
- Price of electricity (RRP)
- Calendar / time
- Regional weather
- Victorian wide average weather
- Engineered features surrounding temperature
- Lagged demand features (demand 5, 10, 30 minutes ago, etc)


We can see that there are a lot of statistically insignificant variables here in this table so let's filter them out.

A lot of what was removed were regional weather features. Because a lot of the data are Victorian region specific data. As a result we will see a lot of multicollinearity and we will discuss why this may be a problem later.

Here are the new variables which I use in my regression:

<csvtable src="/assets/blog/2026-05-08-forecasting-electricity-demand-regression-3/ols_regression_new_coefficients.csv" ></csvtable>

Ok, what about performance. Is our model good?

Well, this is the result:

- MAE: 41.338MW
- RMSE: 55.352MW
- MAPE: 0.907%

Where MAE is Mean Absolute Error
RMSE is Root Mean Squared Error
MAPE is Mean Absolute Percentage Error

Being only wrong on average by a margin of 0.91% isn't too bad, but given the fact that we know what what our demand was 5 minutes ago doesn't actually make it that impressive.

Just for comparison, if I were to use the demand data from 5 minutes ago and predict that 5 minutes later, demand would be the same. I would only be wrong by about:

- MAE: 48.330MW
- RMSE: 63.036MW
- MAPE: 1.050%

So, although our model is good, it's not that much better.

<br>

Let's try addressing that multicollinearity issue we mentioned earlier.

Multicollinearity is

### Conclusion maybe?

Looking back, the question I'm trying to answer might not actually be useful. For AEMO, demand in the next 5 minutes will be very similar to the previous 5 minutes. What they care about would probably be peak demand during the day or forecasting energy demand for the next 24 hours on a 5 minute basis.

This specific model would not be the best for that as each 5 minutes passes, the forecast error will compound. 