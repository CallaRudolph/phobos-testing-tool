[![Build Status](https://travis-ci.org/CallaRudolph/phobos-testing-tool.svg?branch=develop)](https://travis-ci.org/CallaRudolph/phobos-testing-tool)

# phobos-testing-tool

A project to automate basic testing of websites using google lighthouse API.

# Packages, APIS, and Such
- https://github.com/antivanov/js-crawler
This can be used to crawl a url for all the sites on a domain

- https://github.com/GoogleChrome/lighthouse#using-programmatically
The lighthouse API which will be used to build to the database with site feedback

- https://danielkummer.github.io/git-flow-cheatsheet/ GitFlow

- https://travis-ci.org/ Travis CI

# The Project
- [x] **Step 1: Scaffolding / Setup**
  - [x] Express
  - [x] MongoDB
  - [x] React
  - [x] Mocha/Chai
  - [x] Heroku
  - [x] TravisCI
- [x] **Step 2: Crawling**
  - [x] Crawl Unit Tests Written and Failing
  - [x] js-crawler Implementation and Tests Passing
- [x] **Step 3: Lighthouse API Integration**
  - [x] Lighthouse API Unit Tests Written and Failing
  - [x] Lighthouse API Integrated and Basic Tests Passing
- [ ] **Step 4: Putting the Crawl and the Lighthouse API Together**
  - [ ] Unit Test Written and Failing to Feed Crawler a URL and Run Lighthouse on Each Page
  - [ ] Unit Test Passing to Crawl and Test Each Page
- [ ] **Step 5: Saving the Data**
  - [x] Analyze Lighthouse JSON and Develop DB Schema for Archiving Results
  - [ ] Write Unit Tests for Storing Lighthouse API Data
  - [ ] Unit Tests Passing for Storing Data
  - [ ] Write Unit Tests for Storing All Lighthouse Results From a Successful Crawl
  - [ ] Successful Crawl Lighthouse Results Unit Test Passing
- [ ] **Step 6: Displaying Results**
  - [x] Create Basic UX / Component Map for Displaying Results of Multiple Sites Reviewed
  - [ ] Write Unit Tests for Displaying Sites and Lighthouse Page Audits
  - [ ] Write React Components to Display Results and Pass Tests

# Setup

**MongoDB Installation (with Homebrew)**
1. `brew install mongodb`
2. `sudo mkdir -p /data/db` (configures local data storage)
3. `chmod -R a+rw /data/db` (provides access to store data locally)

**Development**
1. `npm install -g nodemon` (monitors changes in src file and restarts server as needed)
2. `npm install`
3. `npm run webpack` (1st window to watch for changes and rebuild)
4. `npm run start` (2nd window to run nodemon/express server)
5. `mongod` (3rd window to start local mongoDB server)

**Heroku**
1. `brew install ruby` (If you don't have Ruby)
2. `sudo gem install travis -v 1.8.8 --no-rdoc --no-ri` (Travis CLI)
3. Create a free Heroku account [here](https://signup.heroku.com/login).
4. `brew install heroku/brew/heroku` (Heroku CLI)
5. `heroku login`
6. `heroku create 'app name'`
7. `heroku addons:create mongolab`
8. `heroku addons:open mongolab`
9. `travis encrypt $(heroku auth:token) --add deploy.api_key` (adds your API key to .travis.yml)
10. Update .travis.yml with your specific Heroku app name --> app: my-app-123
11. Commit any changes you have made.
12. `git push origin master`

# Next Steps
- [ ] Write and pass tests for crawler/lighthouse integration, storage of data, and displaying results
- [ ] Attempt to save entire lighthouse object into Mongo
- [ ] Improve UI for lighthouse results, including display of critical request chain values for easy copy/paste
- [ ] Implement background worker to run lighthouse detail, preventing Heroku's 30 second timeout
