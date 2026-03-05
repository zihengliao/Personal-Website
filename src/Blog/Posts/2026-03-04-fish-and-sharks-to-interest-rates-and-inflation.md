---
title: "Simulating Inflation and Interest Rates with Fish and Sharks"
date: "2026-03-04"
---

## Simulating Inflation and Interest Rates with Fish and Sharks

Sounds silly right? Hear me out.

The relationship between inflation and interest rates are actually very similar to the relationship between fish and sharks believe it or not.

But first let's lay out some definitions. These are not the official techincal definitions but rather an approximation of what it is and what it represents so you as the reader are on the same page as me.

<a href="https://www.rba.gov.au/inflation-overview.html#:~:text=Inflation%20is%20an%20increase%20in,and%20growth%20in%20real%20wages." style="text-decoration: underline; color: inherit;">
Inflation</a> - How much more the price of goods and services have become over a time period

<br>

<a href="https://www.rba.gov.au/s/search.html?query=interest+rate&collection=rba-web#:~:text=RBA%20Glossary%20definition%20for%20interest,are%20invested%20or%20lent%20out." style="text-decoration: underline; color: inherit;">
Interest Rates</a> - (will be referred as Interest throughout the article): The cost of
borrowing money

<div style="height:40px;"></div>

Going back to the relationship. Think of it like this.

Imagine inflation being the population of fish. Fish population rises and falls according to seasons alongside the predators that gobble it up. The predator here being the shark which represents interest rates. And as we've seen hisotrically, as interest rates (shark population) go up, inflation (fish) goes down.

Now the question is, how do we simulate this?

Well, about 100 years ago an Italian mathematician named Vito Volterra developed a model to explain the interactions between prey fish and predator fish after noticing his son in law was catching more predator fish than prey fish despite a smaller fishing industry due to WW1. Volterra credited Alfred J. Lotka after realising the equations were already previously published but for different scientific applications hence today's name for this particular set of equations called the Lotka-Volterra model.

Today we're going to be using these equations to model inflation and interest rates.

<div style="height:40px;"></div>

Let's first make some assumptions for our problem statement.

1. We assume that inflation is always trying to increase naturally due to the innate greed in humans.

2. We are going to assume that the RBA (Reserve Bank of Australia) doesn't like inflation being too high and will always try to decrease it as much as possible.

3. We will assume that there are no external influences to inflation other than interest rates

4. Inflation and interest rates can take up continuous values (eg. interest rates = 2.893565...%)

<div style="height:40px;"></div>

The equations:

$$
\frac{dx}{dt} = ax - \beta xy
$$

$$
\frac{dy}{dt} = \delta xy - \gamma y \left(1 + \frac{y}{K}\right)
$$

where:
- $x$ = inflation

- $y$ = interest rates

- $\alpha$ is the natural increase in inflation – refer to assumption 1

- $\beta$ is the rate at which inflation is being reduced due to interest rates

- $\delta$ is the increase in interest rates which is proportional to the current interest rates and the inflation rate

- $K$ is the carrying capacity

- $\gamma$ is the rate at which the RBA wants to decrease interest rates

<br> 

These equations may look intimidating at first but the meaning they carry is quite simple.

Let's look at the equation for inflation: $\frac{dx}{dt} = ax - \beta xy$

- $\frac{dx}{dt}$ is the rate at which inflation is changing
- $ax$ represents the inherent nature of increasing inflation characterised by the current inflation multiplied by an arbitrary constant $a$
- $-\beta xy$ is the effect interest rates have on decreasing the current inflation characterised by the current inflation, interest rate and an arbitrary constant $\beta$

Looking at interest rates: $
\frac{dy}{dt} = \delta xy - \gamma y \left(1 + \frac{y}{K}\right)
$

- $\frac{dy}{dt}$ is the rate at which interest rates are changing
- $\delta xy$ represents how much the interest rates should increase by characterised by the current inflation, interest rate and an arbitrary constant $\delta$
- $\gamma y \left(1 + \frac{y}{K}\right)$ looks a bit confusing but its purpose is to reduce interest rates. It also has an additional property which is a "carrying capacity" $K$ meaning that the larger interest rates are, the more we will want to bring them down

<br> 

Note that because interest rates are announced 8 times a year in australia, our simulation will be modelled using discrete time values rather than with continuous values.

For inflation:

$$
\Delta x = \alpha x_t - \beta x_t y_t
$$

$$
x_{t+1} - x_t = \alpha x_t - \beta x_t y_t
$$

$$
x_{t+1} = \alpha x_t - \beta x_t y_t + x_t
$$

For interest rates:

$$
\Delta y = \delta x_t y_t - \gamma y \left(1 + \frac{y}{K}\right)
$$

$$
y_{t+1} - y_t = \delta x_t y_t - \gamma y \left(1 + \frac{y}{K}\right)
$$

$$
y_{t+1} = \delta x_t y_t - \gamma y \left(1 + \frac{y}{K}\right) + y_t
$$

This basically defines what the next inflation and interest rate values should be based on the above equations.

Using the below selected hyperparameter values:

$\alpha = 0.07$, 
$\beta = 0.02$, 
$\gamma = 0.3$, 
$\delta = 0.1$, 
$K = 30$

Note, that these hyperparameter values were chosen almost arbitrarily by me when playing around with different hyperparameter values.

Let's set the interest rates and inflation to be representative of the current Australian situation.

Inflation $x = 3.8\%$, 
Interest Rates $y = 3.85\%$

![Interest vs Inflation 10 years](/assets/blog/2026-03-04-fish-and-sharks-to-interest-rates-and-inflation/interest_vs_inflation.png)

I have graphed what inflation and interest rates will look like for the next 10 years under the current assumptions and model.

I don't know about you, but I find this graph kind of funny as interest rates are always a bit late in controlling the "momentum" of inflation.

There also seems to be a cycle in rising inflation and interest rates every 5 years under our current model.

However, with each cycle, it seems like the cycles are getting smaller and smaller. 

Let's see what interest rates and inflation will look like in 100 years.

![Interest vs Inflation 100 years](/assets/blog/2026-03-04-fish-and-sharks-to-interest-rates-and-inflation/interest_vs_inflation_100.png)

This is another hilarious graph. After 100 years, the RBA seems to finally reach a steady state where they get inflation under control at a steady 3.3%. It only took 100 years and 800 announcements.

But we know that there are random factors that affect inflation with varying degrees of impact such as war, pandemics, and a whole bunch of other things.

There's a dozen different ways you can model randomness here.

But I'm just going to add a bit of white noise in the form of a normal distribution to my inflation equation to look like this.

$$
x_{t+1} = \alpha x_t - \beta x_t y_t + x_t + \mathcal{N}(0,0.1)
$$

![Interest vs Random Inflation](/assets/blog/2026-03-04-fish-and-sharks-to-interest-rates-and-inflation/interest_vs_inflation_random.png)

Despite adding a random portion to inflation, interest rates seem to be doing a pretty good job at holding inflation relatively steady.

If we run this 9 more times, would inflation be just as steady.

![Interest vs Random Inflation Grid](/assets/blog/2026-03-04-fish-and-sharks-to-interest-rates-and-inflation/interest_vs_inflation_random_9.png)

Results seem pretty consistent in terms of oscillating around the 3.3% mark. However we do seem to lose our "steady state" convergence.

If we run this 1000 times, we can get a range of the expected behaviour.

![Interest vs Random Inflation Grid](/assets/blog/2026-03-04-fish-and-sharks-to-interest-rates-and-inflation/interest_vs_inflation_range.png)

The results are sort of to be expected in this graph. You can see that the average remains realtively the same as our original model since we've added noise in the form of a normal distribution with no bias. Inflation and interest rates converge over time although there does appear to be some minor variability towards the end of our simulation.

With the randomness added into inflation, we can see that at the beginning up until the 10 year mark or 80th announcement, we are still relatively confident with the trend of inflation and interest rates. However after that, our model seems to state that anything can happen and is less confident with determining trends in the distant future.

### Concluding statement

These hyperparameters were not chosen as the best fit to make predictions of future RBA decisions. They were merely arbritarily selected as a way to simulate the effects of inflation and interest rates on each other.

The Lotka-Volterra approach does seem to provide an interesting way to capture the behaviour of interest rates and inflation. While the results should not be interpreted as predictive, the model demonstrates that predator–prey style dynamics can approximately reproduce certain macroeconomic patterns.

For future works, it may be worth fitting versions of the Lotka-Volterra model to real RBA data to determine if it is capable of describing and even predicting real monetary decisions.