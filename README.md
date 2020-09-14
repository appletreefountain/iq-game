# IQ Game

This is a game that is based on a particular task within the visual memorization portion of the abbreviated IQ test found under https://openpsychometrics.org/tests/FSIQ/. The original test uses set patterns that remain identical between reruns of the test so this game offers something similar to a randomized variation of it. It is playable under https://appletreefountain.github.io/iq-game/iq.html. However, you can copy it as you please and there should be no dependency on a running web server or other online resources, in order for it to also be playable offline. 

![Preview](/preview1.png)

# Rules

A random arrangement of squares is shown on a grid at the beginning of each round. After a short time for the player to memorize the arrangement, the player is challenged to recreate the same arrangement from memory. The difficulty grows as the player progresses from level to level. Any mistakes will set the player back by one level. 

# Correlation With IQ

The game will display an IQ that represents an attempt to approximate the scoring on the online test above. I have created this game in part out of curiosity how closely one will approach a person's full scale IQ or sub-scores thereof. People who have taken more proper IQ tests are encouraged to compare their scores with the one from this game for accuracy. As each round is randomized, a player can encounter arrangements that are above or below the average difficulty of a level (even including empty patterns, in which case they can simply be skipped, like a bonus level a lucky player receives for free), for a given person, which makes it hard to judge the true memorization abilities it would require for the purpose of scoring. The parameters used for the generation of a level are a function of the level alone so by setting back the player one level for a mistake only I was attempting to see if the score would settle close to a good estimate that approaches the scoring for the hand-picked arrangements on the original test above over longer runs of the game. Through personal experimentation a sigmoid function was chosen that seemed to loosely map levels of average difficulty to IQ scores that appeard to correspond to correct completion of patterns of similar difficulty on the original test. It also delivered a ramp of difficulty from the simplest arrangements up to difficulties that should far exceed human ability in a manner gradual enough to entice the player to progress. Board sizes and pattern complexity might differ from the online test, though, as the game leans towards being more foregiving of mistakes, so the level difficulty for comparable IQ scores probably needs to be a little above what it is on the original online test. It might be interesting to see what accuracy could eventually be attained through collaborative fine-tuning of those function parameters as more people have played the game, but the game itself currently has no functionality to provide such feedback. As the difficulty approaches levels unrealistic for humans, any estimates for IQ are most likely equally unrealistic and fictitious. Current limit for IQ caps out at 200 but it might be interesting to imagine what the abilities of a human like that would look like, if their relative ability in those super-human ranges increased by degrees similar to more familiar ranges. However, not only is the online test above a mere approximation of more proper tests, this game is in turn an approximation of the online test above, which most likely means that it is even less reliable for purposes of IQ estimation. It would be intersting if, through experimentation with more players, further tuning of the scoring function, and maybe other people's modifications of this game through forks, a game could be created on this concept, if played long enough, will manage to settle on an IQ score that closely reflects a person's IQ but is also open ended and randomized in such a way that it can be used for puposes of an enjoyable form of exercise at the same time.

I dislike this sort of boilerplate about how people might receive this but no one should feel too bad about not doing well on either the test above or this game. If you feel that your memory is bad, there are many techniques to aide one's memory, such as memory palace or mnemonic major system. Incredible feats of memorization have been accomplished by people who, without use of such techniques, never felt as if they had a particularly good memory.

https://www.wikiwand.com/en/Mnemonic_major_system

While our IQs have been shown to strongly correlate with many positive life outcomes one should remember that the accuracy of these statistics rely on averages over a large number of people. Neither do individual IQ scores towards the lower end of the distribution curve fate you to failure in life with absolute certainty nor do high IQ scores guarantee you success. These tests also make no consideration of age, which I believe is an important component in a proper estimation of IQ so do not take these tests too seriously until you have an understanding of what any of these scores might mean in context of your personal circumstances. Pursue whatever your goals in life might be and enjoy this game.
