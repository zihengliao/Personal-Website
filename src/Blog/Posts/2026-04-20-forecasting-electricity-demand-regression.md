---
title: "Forecasting Electricity Demand Using Regression Pt.1"
date: "2026-04-20"
---

## Forecasting Electricity Demand Using Regression Pt.1

Firstly, what is regression. 

There are multiple definitions for regression, one of them being "the act of returning to a previous, less advanced, or worse state" - Cambridge Dictionary. 

But this is clearly not what we are talking about. In statistics, regression is a statistical method used to estimate a relationship between a dependent variable and one or more independent variables.

The most common one that we've all likely seen is the linear regression.

![Linear Regression](/assets/blog/2026-04-20-forecasting-electricity-demand-regression/linear_regression.jpeg)

The above picture is the relationship between weight and blood pressure - credit: Professor Daniel Schmidt. 

From this picture alone, we can see that as weight increases, your blood pressure is likely to increase as well.

We can model this with a mathematical equation:

$y = \beta x + b$

Where $y$ is the dependent variable (Blood Pressure) and $x$ is the independent variable (Weight).

Now, how should we interpret $\beta$ and $b$.

$\beta$ is a coefficient and essentially gives a "weighting" on the independent variable $x$. 

$b$ sort of has 2 interpretations and can be interpreted as either what the dependent variable should be when the independent variable $x$ is equal to 0 or it can have no interpretation and is just there for mathematical purposes to describe accurately the relationship when the independent variable $x$ isn't 0.

For example, under the above formula, when someone weighs 0, their blood pressure will equal to whatever $b$ is.

But this is nonsense because when someone weighs 0, they're most likely dead so in this case, it mainly serves as a mathematical convenience to accurately model the relationship between blood pressure $y$ and weight $x$.

Now, relationships (regression) don't have to be linear. 

For example, the relationship between time and electricity demand.

![Non-Linear Regression](/assets/blog/2026-04-20-forecasting-electricity-demand-regression/nonlinear_regression.jpeg)

We can see that the relationship here is more representative of a bell shaped curve than a straight line.

<br>

What's more, is that dependent variables can depend on multiple independent variables.

For example, this is a real formula AEMO uses to calculate the residential consumption per metered connection as part of their forecasting in the ESOO and ISP. [Link](https://www.aemo.com.au/-/media/files/stakeholder_consultation/consultations/nem-consultations/2024/2024-electricity-demand-forecasting-methodology-consultation/final-determination/electricity-demand-forecasting-methodology_.pdf?rev=683642cd0a264f11b0e5d1c7ef9aefde&sc_lang=en)

$$
\begin{aligned}
\text{Res\_Con}_{i,t} &= \beta_{\text{Base},i} \\
&+ \beta_{\text{HDD},i} \cdot \text{HDD}_{i,t} \\
&+ \beta_{\text{CDD},i} \cdot \text{CDD}_{i,t} \\
&+ \beta_{\text{Non-workday},i} \cdot \text{Non-workday}_{i,t} \\
&+ \beta_{\text{Shock-impact},i} \cdot \text{Shock-impact}_{i,t} \\
&+ \varepsilon_{i,t}
\end{aligned}
$$

Looks intimidating, but all this is saying is that the residential consumption per connection is dependent on:

- $HDD_{i,t}$: Average heating degree days for region $i$ on day $t$.

- $CDD_{i,t}$: Average cooling degree days for region $i$ on day $t$.

- $Non\text{-}workday_{i,t}$: Dummy variable indicating whether day $t$ is a non-working day (e.g. weekend or public holiday) for region $i$.

- $Shock\text{-}impact_{i,t}$: Dummy variable capturing the impact of external shocks (e.g. COVID-19) for region $i$ on day $t$.

Regression is so powerful because of its ability to be interpreted with ease whilst being able to maintain a high level of accuracy. We are able to identify exactly what contributes to the result of our forecasted dependent variable as well as identifying how much it contributes.

A question you may be asking right now is this. Electricity demand depends on so much more than this. For example, the amount of cloud cover will affect how much sunlight hits your home affecting the internal temperature of your home, or behaviour changes such as Victoria's work from home policy.

The point is that there are infinite amount of variables that impact demand, is there a way to include everything. Surely, if we include every single possible variable this will make our forecast more accurate.

Well no, it doesn't. It actually makes our model less accurate because now we are over-fitting. What this means is you're no longer fitting your model to the underlying relationship, but also the "noise". "Noise" here just means the randomness in data.

This is due to the fact that some variables aren't "statistically significant" to the regression model. This basically just means that the model can't confidently distinguish whether there is a relationship or if it is just noise.

There are also a number of other problems with including a lot of variables to your regression. 

The main one being your ability to interpret the model. Sometimes this isn't important to your use case (for example large language models. Nobody actually knows what each variable in there actually represents.)

But in the case of AEMO where there are real consequences if things go wrong, and stakeholders to convince, you need to be able to explain how your model works and why it is making the prediction it is.

Ok, what if all your variables are statistically significant yet, you still have a lot of variables which affects your ability to interpret the model.

This is where regularisation comes in. Regularisation requires its own article due to the different nuances of different techniques. But here is the main idea. 

Regularisation is a way to punish your model for being too complex by shrinking or removing variables from your model.

In doing so, there is a tradeoff that occurs. Your model becomes more biased, but in exchange it will have less variance.

The opposite end of the spectrum also exists. You can't fully remove all your variables to completely remove variance since your model will just be completely biased (only predicting 1 value).

So you need to find the sweet spot where it balances the perfect number of variables.

### Concluding Statement

Regression is a powerful tool not because it captures everything, but because it captures enough. 

With a problem as complex as forecasting electricity demand, there will always be noise and uncertainty. The goal is therefore not to build the most complex model possible, but to build one that balances accuracy and interpretability.

A good model is not the one that fits the past perfectly, but the one that generalises well to the future.

Therefore, it's usually in everybody's best interests to keep things simple.