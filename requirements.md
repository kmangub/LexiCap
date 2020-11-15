# Software Requirements
## Vision

**What is the vision of this product?**
  1. We want to create an app where we can look up the definition of a word.
  2. The app will have the ability to store it so that we have access to it later on. 
  3. The app will have flash card and quiz functionality so that we can continue to practice words that can be easily forgotten.

**What pain point does this project solve?**
1. This will eliminate having to go back and look up the definitions again.
2. This can also help with practicing words an how to use them.
3. Help solidify how to pronounce the words correctly.

**Why should we care about your product?**
1. If you are in the process of learning English, you want to sound smart.
2. This app takes in multiple features and have easy access to them.
3. You can show off to your friends that you can say the word in different languages.

## Scope (In/Out)
### IN
**What will your product do**
- We want to use a dictionary/thesaurus API to search for a word the client wants to learn more about and generate a flashcard for continued learning.

- Continue learning to strengthen the users vocabulary and understanding of the english language with fun game -- like flashcards. 

- Save searched words into a database and have corresponding flash cards to quiz the user on demand. 

- Incorporate a translation API to teach that word in other languages. 

- Utilize a quote generator API to bring in quotes that contain the searched word. 

- Use an Owlbot API to generate photos for the searched word.

### OUT
**What will your product not do**
- This app will not teach you how to speak English.
- This app will not translate an actual conversation.

## Minimum Viable Product vs
**What will your MVP functionality be?**

- Save searched words into a database and have corresponding flash cards to quiz the user on demand. 
- Use translation API to teach that word in other languages.

- Use a quote generator API to bring in quotes that contain the searched word. 

- Generate photos using Owl API for the searched word.

**What are your stretch goals?**

- Point system tied to an individual user - the more you quiz and succeed the more points you get! 
- Leader board to go with the point system?
Flip animations for the flash-cards.
- Responsive Web Design for phone-laptop-tablet usability.
- Incorporate audio files into the flashcard so you can HEAR how to properly pronounce the word too!
- Google translate link somewhere /Google translate API.
- Functionality to edit the flashcard to incorporate your preferred acronym/synonym etc.

**Functional Requirements**

A user can:

- Look up the definition of the word.
- Create a compilation of the words and create a quiz/flashcard for practice.
- Delete the word.
- Create a flashcard if the app doesn't recognize a word.
- Hear word pronunciation.
- See quotes that contain that word.
- See how the word is used in a sentence.

## Data Flow

1. The user goes in to the website and is asked to either type a word, create a word flashcard, look at the list of cards the user saved, or to take a quiz using those words.

2. Once the user types in the word and presses search, they go to the results page where they see a list of words and their definitions.

3. The user can then save the word and adds it to the database for review.

4. Once the user saves the word, they are brought back to the home page.

5. If the user clicks the list of saved words, they can review the flash cards.
> The user also has the option to archive the word or delete it completely.

6. If the user clicks quiz, they can take the quiz with all of the words saved and also choose how many questions the quiz will have.

7. If the user clicks archive, they can take a look at the list of words that are archived and will not be included in the list.

8. Once the user is satisfied, they can close the app.

> If the user forgets the word, they can go back to the app and see the list that they saved before.






## Non-Functional Requirements (301 & 401 only)

**NON-FUNCTIONAL REQUIREMENT (NFR)** specifies the quality attribute of a software system. They judge the software system based on Responsiveness, Usability, Security, Portability and other non-functional standards that are critical to the success of the software system. 

<!--Definition taken from: https://www.guru99.com/non-functional-requirement-type-example.html -->

- Using environmental variables (`.env`) to protect api keys from malicious intent.

- Using express.urlencoded to protect user privacy on any `app.post` code so that the word stays hidden at the address bar.

- The app is satisfying the user's needs by eliminating the wait or load time to grab all of the data.




