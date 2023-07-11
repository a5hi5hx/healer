# healerbackend



## API DOCS

# User Authentication:
#### POST /user/signup (username, email, password, phoneNumber) 
---
    -if Success
    {
    message: string,
    success: bool,
    token:  String,
    }
    
    -if Failed
    {
    message: String,
    success: bool,
    }
---

#### POST /otp/verifyUser (email,otp)
---
    -if Success (201)
    {
    message: user is verified ,
    success:  true   }

    -if Failed
    {
    message:Some error occurred,
    success: false
    }
---

#### POST /user/login (username, userpassword)
---
    -if Success
    {
    message: string,
    success: bool,
    token:  String,
    _id: String,
    username: String,
    email: String,
    phoneNumber: String,
    isVerified: bool
    }

    -if Failed{
    message: String,
    success: bool
    }
    ---

#### POST /user/tokenValid (x-auth-header (token)) // to check previously login
---
    -if Success
    {
    "msg": true,
    "success": true,
    "_id": "64882dcdfaca626c8cad8b12",
    "username": "ashish",
    "email": "ashishpaudel54@gmail.com",
    "password": "$2a$10$IHFLN8DiIk/yBEsUjs0kgeigDvduQLYL.mTJ.5TPuJX.QVjxHyI9a",
    "phoneNumber": "9874561230",
    "isVerified": true
    }

    -if Failed{
    message: String,
    success: false
    }
    ---

#### POST /company/addDetails (image, companyName, companyCategory, companyRating, companyDetails)
---

    -if Success (201)
    {
    "msg": "Company Details Added Successfully.",
    "success": true,
    "companyName": "BrandBuilder",
    "companyCategory": "IT Services",
    "companyRating": 3.2,
    "companyDetails": "It COmpany",
    "companyLogo": "http://res.cloudinary.com/djq37xptm/image/upload/v1686724803/jfmccml1pccm0hmkfziz.jpg",
    "_id": "648960c331e8b1d00802de15",
    }
    -if Failed
    {
    message: String,
    success: bool
    }
---

#### GET /company/allCompanyDetails 
---
    -if Success (201)
    {
    "_id": "648960c331e8b1d00802de15",
    "companyName": "BrandBuilder",
    "companyCategory": "IT Services",
    "companyRating": 3.2,
    "companyDetails": "It COmpany",
    "companyLogo": "http://res.cloudinary.com/djq37xptm/image/upload/v1686724803/jfmccml1pccm0hmkfziz.jpg",
    }
    -if Failed
    {
    message: String,
    success: bool
    }
---

#### GET /company/companyDetails/:id  (id as params) 
---
    -if Success (201)
    {
    "_id": "648960c331e8b1d00802de15",
    "companyName": "BrandBuilder",
    "companyCategory": "IT Services",
    "companyRating": 3.2,
    "companyDetails": "It COmpany",
    "companyLogo": "http://res.cloudinary.com/djq37xptm/image/upload/v1686724803/jfmccml1pccm0hmkfziz.jpg",
    }

    -if Failed
    {
    message: String,
    success: bool
    }
---

#### GET /company/companyDetails/:id  (id as params) 
---
    -if Success (201)
    {
    "_id": "648960c331e8b1d00802de15",
    "companyName": "BrandBuilder",
    "companyCategory": "IT Services",
    "companyRating": 3.2,
    "companyDetails": "It COmpany",
    "companyLogo": "http://res.cloudinary.com/djq37xptm/image/upload/v1686724803/jfmccml1pccm0hmkfziz.jpg",
    }

    -if Failed
    {
    message: String,
    success: bool
    }
---

#### POST /subs/addSubs (name, listingCompany(_id), sliverPlan, goldPlan, platinumPlan, details)
---
    -if Success (201) 
    {
    "message": "Subscription Paln added successfully.",
    "success": true
    }

    -if Failed
    {
    message: String,
    success: bool
    }
---

#### GET /subs/allSub 
---
    -if Success (201)  
    [
    {
    "_id": "648960c331e8b1d00802de15",
    "name": "SEO",
    "sliverPlan": 70,
    "goldPlan": 100,
    "platinumPlan": 120,
    "details": "Make our site appear top",
    "__v": 0,
    "companyName": "BrandBuilder",
    "companyCategory": "IT Services",
    "companyRating": 3.2,
    "companyDetails": "It COmpany",
    "companyLogo": "http://res.cloudinary.com/djq37xptm/image/upload/v1686724803/jfmccml1pccm0hmkfziz.jpg"
    }]

    -if Failed
    {
    message: String,
    success: bool
    }
---

#### GET /subs/allSubs/:id 
---  
    -if Success (201)  
    {
    "_id": "648960c331e8b1d00802de15",
    "name": "SEO",
    "sliverPlan": 70,
    "goldPlan": 100,
    "platinumPlan": 120,
    "details": "Make our site appear top",
    "companyName": "BrandBuilder",
    "companyCategory": "IT Services",
    "companyRating": 3.2,
    "companyDetails": "It COmpany",
    "companyLogo": "http://res.cloudinary.com/djq37xptm/image/upload/v1686724803/jfmccml1pccm0hmkfziz.jpg"
    }

    -if Failed
    {
    message: String,
    success: bool
    }
---
#### POST /otp/send (email)
---
    -if Success (201)
    {
    message:"OTP sent successfully." ,
    success:true ,
    }

    -if Failed

    {
    message:String,
    success: bool
    }
---
#### POST /otp/validate (email,otp)
---
    -if Success (201)
    {
    message: OTP is valid ,
    success:  true   }

    -if Failed

    {
    message:Not Signed Up. Use correct email.,
    success: false
    }
---


# Company Auth:

#### POST /company/cSignup
---
body
{
  "username":"brandbuilder",
  "email":"test@brandbuilder.com.np",
  "phoneNumber":"7894563210",
  "userpassword":"123456789"
}
---
---
Resopnse
{
  "message": "Company created.",
  "u": {
    "username": "brandbuilder1",
    "email": "test1@brandbuilder.com.np",
    "phoneNumber": "7894563210",
    "role": "C",
    "_id": "64acfa08044cd4454c833f50",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTI3ZGJlMDY1NDg3YmFlMmYzZWFkMSIsInJvbGUiOiJDIiwiaWF0IjoxNjg5MDU3NTg1fQ.-tgvWaaWjE98yCDVLR6CwaWnXBp_G_uDylcTQuHCGLk"
  },
  "success": true
}
---
#### POST /company/cLogin
---
    send body: 
    {
  "username":"brandbuilder",
  "userpassword":"123456789"
}
---
---
    response
    {
  "message": "valid Password.",
  "success": true,
  "_id": "64a27dbe065487bae2f3ead1",
  "username": "brandbuilder",
  "email": "test@brandbuilder.com.np",
  "phoneNumber": "061456789",
  "role": "C",
  "__v": 0,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTI3ZGJlMDY1NDg3YmFlMmYzZWFkMSIsInJvbGUiOiJDIiwiaWF0IjoxNjg5MDU3NTg1fQ.-tgvWaaWjE98yCDVLR6CwaWnXBp_G_uDylcTQuHCGLk"
}
---


# Freelancer Auth:
#### POST /user/fsignup (username, email, userpassword, phoneNumber) 
---
    -if Success
    {
    message: string,
    success: bool
    }
    -if Failed
    {
    message: String,
    success: bool,
    }
---
#### POST /user/flogin (username, userpassword) 
---
    -if Success
    {
    message: string,
    success: bool,
    _id: String,
    username: String,
    email: String,
    phoneNumber: String,
    }
    -if Failed{
    message: String,
    success: bool
    }
    ---



---



# Freelancer Profile:


#### POST /freelancer/addprofile (_id, name, image, skill, experience, rating, charge ) 
---
    -if Success
    {
    message: string
    }
    -if Failed
    {
    message: String
    }
---

#### GET /freelancer/view
---
    -if Success
    {
    id: String,
    name: String,
    image: String,
    skill: String,
    experience: Number,
    rating: String,
    charge: String
    }
    -if Failed
    {
    message: String
    }
---

#### DELETE /freelancer/delete/:id
---
    -if Success(200)
    {
    message: String
    }
    -if Failed
    {
    message: String
    }
---

#### UPDATE /freelancer/update/:id
---
    -if Success
    {
    id: String,
    name: String,
    image: String,
    skill: String,
    experience: Number,
    rating: String,
    charge: String
    }
    -if Failed
    {
    message: String
    }
---

[Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.com/codefestdevs/healerbackend.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://gitlab.com/codefestdevs/healerbackend/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Automatically merge when pipeline succeeds](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thank you to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README
Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
