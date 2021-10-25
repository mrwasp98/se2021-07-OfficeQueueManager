# RETROSPECTIVE (Team 07)

The retrospective should include at least the following sections:

- process measures
- quality measures
- general assessment

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs done : 5 vs 5
- Total points committed vs done : 18 vs 18
- Nr of hours planned vs spent (as a team) : 31h 35m vs 53h 15m

**Remember**  a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> <u>Our DoD</u>: A story is done when the unit at the background behaves in the expected way and when the react component created is doing its job correctly. This means that 
>
> - when the data submitted via the GUI is correctly recorded into the DB
> - when the data recorded in the DB is correctly shown to the user
>
>  the story is done.

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| *#0*  | 9       | -      | 12h 45m    | 31h 20m      |
| \#1   | 4       | 5      | 5h 15m     | 3h 25m       |
| #2    | 6       | 3      | 1h 35m     | 6h           |
| #3    | 4       | 5      | 7h         | 5h 5m        |
| #4    | 4       | 3      | 1h         | 5h 35m       |
| #5    | 3       | 2      | 4h         | 1h 50m       |

- **Hours per task (average, standard deviation)** => mean: 10h 39m 
- **Total task estimation error ratio: sum of total hours estimation / sum of total hours spent from previous table** 
  31h 35m / 53h 15m = 0.6

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated => 0
  - Total hours spent => 0
  - Nr of automated unit test cases => 0
  - Coverage (if available)

We performed only system testing with production platform.

- E2E testing:
  - Total hours estimated => 10
  - Total hours spent => 20
- Code review
  - Total hours estimated => 0
  - Total hours spent => 1
- Technical Debt management:
  - Total hours estimated
  - Total hours spent
  - Hours estimated for remediation by SonarQube
  - Hours estimated for remediation by SonarQube only for the selected and planned issues
  - Hours spent on remediation
  - debt ratio (as reported by SonarQube under "Measures-Maintainability")
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability )

## ASSESSMENT

- **What caused your errors in estimation (if any)?**
  - Lack of experience. Lack of communication that led to ambiguity in the development of the tasks.
- **What lessons did you learn (both positive and negative) in this sprint?**
  - We need to communicate more and to create a common plan before starting coding. On the positive side, we discovered that we are eager to work!
- Which improvement goals set in the previous retrospective were you able to achieve?
- Which ones you were not able to achieve? Why?
- **Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)**
  - We need more coordination and to do so we plan on:
    - defining together API and DB structure 
    - creating different branches in out github repository to decrease conflicts in the code
    - learning how to debug in a proper way
- **One thing you are proud of as a Team!**!
  - We learned a lot on how to work together as a team!
  - We have a high level of participation, there’s always someone that answers in our group chat!
  - We always want to reach and surpass our personal standards.