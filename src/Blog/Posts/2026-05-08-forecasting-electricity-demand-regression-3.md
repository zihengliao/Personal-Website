---
title: "Forecasting Electricity Demand Using Regression Pt.3"
date: "2026-05-08"
---

## Forecasting Electricity Demand Using Regression Pt.3

I can't believe there is a part 3 to this as well and from how things are looking, there may be a part 4 as well.

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

Multicollinearity is when your independent variables are correlated. For example because of the close proximity between Geelong and Melbourne, chances are, the temperature between these 2 locations are very closely correlated.

![Linear Regression](/assets/blog/2026-05-08-forecasting-electricity-demand-regression-3/temp_melb_vs_temp_geelong.png)

We can see that these 2 variables are strongly correlated.

So why is this a problem?

The main problem is interpretability. Coefficients in the model become unstable.

If we look at the coefficients from the first model we fitted with all the variables, we can see that the coefficients for temperature don't really make sense.

- Temperature Melbourne: 0.52
- Temperature Shepparton: -0.25

The way we can interpret these coefficients is that as temperature increases across Melbourne, we can expect energy demand to increase, but for Shepparton, it wil decrease. 

Another thing is that because there is more than one variable trying to capture this information, its p-value may look statistically insignificant. 

One thing to note is that multicollinearity doesn't necessary mean that prediction performance will be worse off. It just means your model might not make the most sense.

<br>

Knowing this, let's remove multicollinearity in our model.

<csvtable src="/assets/blog/2026-05-08-forecasting-electricity-demand-regression-3/removed_variables.csv" ></csvtable>

<csvtable src="/assets/blog/2026-05-08-forecasting-electricity-demand-regression-3/non_multicollinearity_regression_summary.csv" ></csvtable>

Using the same training and testing dataset to train and test our model, we find that the results are basically the exact same despite removing about 65 "independent" variables.

- MAE: 41.332MW
- RMSE: 55.399MW
- MAPE: 0.908%

Surprisingly or non surprisingly, the results after removing all these variables produces no better or no worse results than including them. 

Despite being statistical significant with their p-values, it seems those variables are redundant and don't provide much value.

### Conclusion

The goal with this was to build a real time forecast system that balances interpretability and performance.

There is an infinite amount of techniques and ideas to be applied to improve performance, including even trying different models.

Looking back, the question I'm trying to answer might not even actually be useful. For AEMO or energy retailers, demand in the next 5 minutes will be very similar to the previous 5 minutes. What they care about would probably be peak demand during the day or forecasting energy demand for the next 24 hours on a 5 minute basis.
