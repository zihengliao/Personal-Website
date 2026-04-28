---
title: "Forecasting Electricity Demand Using Regression Pt.2"
date: "2026-04-25"
---

## Forecasting Electricity Demand Using Regression Pt.2

Previously we explained what a regression was and why a simpler model was good.

Today, we are going to use the same model with a little addition of flare to try forecast peak electricity demand for the upcoming month of December.

Before you continue to read along, this regression model is uhhh not the best.

I'll explain the limitations with my regression as you read along. 

## 1.

Firstly with any data problem, you need data.

As a start, I decided to use data from the AEMO forecast methodology to do my own forecasting: 

![AEMO forecast methodology](/assets/blog/2026-04-20-forecasting-electricity-demand-regression-2/aemo_regression.jpeg)

From this equation, we can see that AEMO mainly uses "heating degree days", "cooling degree days", "non workday" and a "shock factor". Check out part 1 of the article to see the formal definitions of these variables.

Now aside from "shock impact", all these data points are relatively accessible. 

For simplicity sake, I removed the "shock impact" variable as I didn't have a way to quantify this. 

With Melbourne recently overtaking Sydney in being the largest city in Australia in terms of population, I decided to include population numbers within our model as well.

One thing with population numbers, there is no reliable way of understanding the exact day to day population numbers.

Thus I simplified this by using the estimated population and assumed it to be constant for each month of the year.

In total, we have 4 variables to help us forecast total demand:
- Heating Degree Days
- Cooling Degree Days
- Non workday
- Population number

Data Sources:
- Total Demand: https://www.aemo.com.au/energy-systems/electricity/national-electricity-market-nem/data-nem/aggregated-data
- Temperature: https://open-meteo.com/en/docs
- Non workday: Hardcoded
- Population number: https://www.abs.gov.au/statistics/people/population/national-state-and-territory-population/latest-release

Data was only obtained for December of each year starting from 2021. This decision was due to COVID 19 lockdowns concluding around that time period.

## 2.

Now that we have our data, it's time to build our regression model.

We will be using statsmodel.api to help us with fitting our multivariable linear regression.

They have easy to access tools that also help us see what variables are statistically significant as well as other metrics to see how well our model has fit to the data.

![AEMO forecast methodology](/assets/blog/2026-04-20-forecasting-electricity-demand-regression-2/regression_summary.jpeg)

When identifying which variables are significant or not, we usually perform a "t-test" and from the "t-test" we are able to grab a "p-value".

When determining if a variable is statistical significant, we perform a null hypothesis and assume that the variable is not correlated at all with the dependent variable (electricity demand).

The explanation for p-value and t-test can get a bit complicated so you can skip the explanation part. But essentially the smaller the p-value, the stronger the evidence against our null hypothesis that our variable is not correlated to our dependent variable. 

The t-test tells us how many standard errors away from our null hypothesis (our independent variable has 0 correlation to our dependent variable).

The p-value uses our t-test and gives us a probability of seeing these results given that our null hypothesis is true.

The threshold of our p-value is usually 0.05 for determining statistical significance.

With this in mind, we can see that "HDD" and the population of Victoria don't seem to be good predictors of electricity demand.

This makes sense since heating is not often used in December in Victoria as well as the huge variability in electricity demand each day even thought the population of Victoria remains the same during the month.

This is obvious when we plot these variables against each other.

![Peak Demand vs HDD](/assets/blog/2026-04-20-forecasting-electricity-demand-regression-2/demand_hdd.png)

![Peak Demand vs Population](/assets/blog/2026-04-20-forecasting-electricity-demand-regression-2/demand_population.png)


## 3.

This leaves us with 2 variables to use to predict electricity demand. 
- CDD
- Non workday

You might already see a problem, and yes it's more than likely that this model is too simple to make real forecasting statements.

It will probably make a forecast in the correct direction but not so much in terms of accuracy.

Regardless, let's produce some forecasts. 

![Regression Model](/assets/blog/2026-04-20-forecasting-electricity-demand-regression-2/final_regression.jpeg)

We have our updated regression model:

$$
\text{demand} = 5174.91 + 298.66 \cdot \text{CDD} - 536.55 \cdot \text{non\_working\_day}
$$

We need some data for the expected temperature in December.

The easiest way would be to create a probability distribution of the temperature during that time period and randomly generate samples to simulate weather.

Because this article is about regression and not weather probability distributions, I'm just going to create what looks reasonable for me.

The following normal distribution was fitted to the average temperature in December starting from 2021.

Because El Nino is coming and there's probably an increase in temperature by 2 degrees [link]([Link](https://www.aemo.com.au/-/media/files/stakeholder_consultation/consultations/nem-consultations/2024/2024-electricity-demand-forecasting-methodology-consultation/final-determination/electricity-demand-forecasting-methodology_.pdf?rev=683642cd0a264f11b0e5d1c7ef9aefde&sc_lang=en)), so I have just added 2 degrees to the mean of the distribution.

![Fitted Model](/assets/blog/2026-04-20-forecasting-electricity-demand-regression-2/fitted_normal_distribution.png)

![Adjusted Model](/assets/blog/2026-04-20-forecasting-electricity-demand-regression-2/forecasted_normal_distribution.png)

Now that I have a distribution for temperature, I can simply just take the 2nd or 3rd standard deviation and plug it into my model to forecast a scenario where everyday is an extremely hot day.

OR

we can generate random samples from this distribution and plug them into my regression.

This is called Monte Carlo, where I'm just assuming all possible inputs and seeing the outcomes I will get.

In this simulation, I will generate 1000 different possible results per day to determine possible peak energy demand.

![Simulated Results](/assets/blog/2026-04-20-forecasting-electricity-demand-regression-2/simulated_results.png)

Looking at these simulated results, it's almost as if we could have made these predictions ourselves.

We have a baseline expectation of electricity usage and during the weekend, we see a dip.

However, during really hot days, we can expect demand reaching as high as 10GW.

![December Demand](/assets/blog/2026-04-20-forecasting-electricity-demand-regression-2/dec_demand.png)

Here we have a plot of previous years' electricity demand. We can see that there has been historical peaks reaching close to 10GW as well.

Most notably which our model didn't consider was the fact that between the 20th-25th of December, there is a decline in peak energy demand.

This is likely due to people going on holidays.

## Concluding statement

From the results, you're likely able to already tell that our model is indeed too simple in terms of forecasting anything insightful beyond what we already know.

We would likely gain a more insightful forecast if we considered other variables as well. 

Consideration was not taken towards the holiday season of Victorians especially during the latter half of December which likely results in people travelling.

Modelling through our temperature data was simplified too much as well. Each day was treated as if they were independent from the previous day, however, heatwaves usually span for multiple days making such simulations inaccurate.

In addition, I used average temperature to forecast peak demand which is fine, but more time and experimentation needed to be spent on feature engineering. 

For example, using the range of the maximum temperature during the day and the minimum temperature of the day (max_temp - min_temp). As this variable adds an extra layer of consideration beyond just the average temperature used to determine CDD (Cooling Degree Day)

Overall, despite the model having clear limitations, it fulfills its job in pointing us in the correct direction for estimating energy demand.