---
title: "Simulating Personal Finances"
date: "2026-09-04"
---

## Simulating Personal Finances

As of recently, I've gone down a bit of a rabbit hole in regards to personal finances. From watching creators such as Ben Felix and The Money Guy Show to actually recording all my spending and income, I've been getting really into it and have been inspired by a concept I'm very familiar with but never thought would be applied in this context which is the Monte Carlo simulation.

One thing that I've noticed is that a lot of these Monte Carlo simulations for retirement don't include financial crises such as COVID-19 and the GFC. This matters because assuming you're withdrawing 4% of your portfolio each year for retirement right after a financial crisis, it will affect how long you will be able to sustain yourself compared to assumed averages these other calculators use.

This is usually called sequence of returns risk. Even if average returns are good over the long run, the order of those returns matters a lot once you start withdrawing money.

Let's try simulate this.

The variables in consideration and the type of distribution I will be using when sampling from them are:

- Portfolio returns (gross) - normal distribution with mean at 10%
- Yearly withdrawal rate starting after the age of 60 - normal distribution with mean of 4% and a minimum withdrawal rate of 80k
- Portfolio contributions of $10,000 a year indexed to inflation (annual pay rise)
- Starting point of $30,000 invested at age 23
- Financial crisis frequency - uniformly sampled, with an average frequency of once every 10 years
- Intensity of crises - uniform distribution 10%-50% market decline
- Inflation - normal distribution with mean of 2.5%

Everything here is done before tax.

There are problems with this, 1. we are ignoring the relationship between inflation which determines interest rates and portfolio gains. 2. There have been periods in history where the S&P500 have been down despite there not being a recession, 3. your withdrawal strategy is assuming you will be liquidating an entire year's worth of cash in one go.

Another problem is that usually after a financial crisis, the stock market bounces back up quite strongly, for example (S&P500) right after COVID, prices bounced by 47% in March 2020 after a 34% fall. After the GFC, S&P bounced back up by 68% in the first 12 months after March 2009.

We will be taking a more pessimistic approach and assume the S&P500 will always return more or less around 10%.

Let's take a look at an example. Assuming retirement is done at the ripe age of 60 and a lifespan of up until 80.

![Simulation 1](/assets/blog/2026-09-04-simulating-personal-finances/sim1.png)

Even with a down year of 10% 5 years into retirement, we still end up not only being able to sustain ourselves but also continue to grow our portfolio.

Now, what will happen if we have another GFC and lose 50% of our portfolio in a certain year.

![Simulation 1](/assets/blog/2026-09-04-simulating-personal-finances/sim2.png)

Losing 50% of your portfolio just as you are about to retire and withdrawing 80k may not let your portfolio recover and will quickly run out of money by the age of 70.

Mathematically, this will really only occur if you're withdrawing more than what your portfolio can gain.

What is the probability of this happening though? This is where our Monte Carlo simulation will come in handy. 

After running 10,000 simulations:

![Simulation 1](/assets/blog/2026-09-04-simulating-personal-finances/monte_carlo.png)

Seems like 63.4% of the time, we will get by just fine but given that this is our livelihood we are talking about, this might as well be a gamble at the roulette table on whether we will survive retirement or not.

A more optimal strategy to conserve your wealth right before retiring would probably be to hold onto something less volatile that is able to provide cash flow even in turbulent times.

The amount of your portfolio to reallocate would be different from person to person depending on risk tolerance, tax situation and goals.

### Conclusion

To summarise, average returns are not enough. When crashes happen matters just as much as how often they happen. 