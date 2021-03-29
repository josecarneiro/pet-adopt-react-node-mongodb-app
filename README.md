# Adopt Pet React + Node App

Here's the plan for the app.

## Models

### User

- name
- email
- passwordHashAndSalt
- role = ['individual', 'shelter']
- profilePicture

#### Individual

- preferences
  - species // ['dog', 'cat'], ['dog'], ['cat']
  - qualities // ['calm', 'good_with_kids', 'hypoallergenic']
  - size // ['small', 'medium', 'large']
  - steralized

#### Shelter

- address
- phoneNumber

### Pet

- name
- shelter
- species = ['dog', 'cat']
- breed
- age
- size ['small', 'medium', 'large']
- gender
- qualities // ['calm', 'good_with_kids', 'hypoallergenic']
- steralized
- conditions
- description
- pictures

## Rest API Endpoints

| METHOD | PATH | ACTION | ROLES | COMPLETION |
| POST | /authentication/sign-up | Sign Up | all | ✅ |
| POST | /authentication/sign-in | Sign In | all | ✅ |
| POST | /authentication/sign-out | Sign Out | all | ✅ |
| GET | /authentication/verify | Provide information on current user | all | ✅ |
| PATCH | /authentication/profile | Edit profile of current user | all | ❌ |

| GET | /profile/:id | Displays information about any user | all | ❌ |

| POST | /pet | Allows shelter user to add pet | shelter | ✅ |
| GET | /pet/list | Provides all pets | all | ✅ |
| GET | /pet/random | Provides random pet matching users preferences | individuals | ✅ |
| GET | /pet/:id | Displays information about any pet | all | ✅ |
| PATCH | /pet/:id | Allows shelter user to edit pet | shelter | ❌ |
| DELETE | /pet/:id | Allows shelter user to remove pet | shelter | ✅ |

// Other endpoints to apply for adoption, donate, etc...

## Views

| NAME | PATH | PURPOSE |
| Home | / | List all pets |
| Shelter Profile | /shelter/:id | Show page for shelter |
| Individual Profile | /individual/:id | Show profile page for individual |
| Edit Profile | /profile/edit | Profile Edit |
| Create Pet | /pet/create | Create pet |
| Pet | /pet/:id | Show page for pet |
| Edit Pet | /pet/:id/edit | Edit a single pet |
| Random Pet | /pet/random | Show random pet |
| Sign Up | /sign-up | Sign Up |
| Sign In | /sign-in | Sign In |

## To dos

- Add donation button in shelter page, opens `/shelter/donate` page
- Add sample.env file
- Ensure mobile first development with desktop-friendliness

## Wishlist

- Add Material Icons
