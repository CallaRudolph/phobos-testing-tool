# phobos-testing-tool
A project to automate basic testing of websites using google lighthouse API.

# Packages, APIS, and Such
- https://www.npmjs.com/package/simplecrawler
This can be used to crawl a url for all the sites on a domain

- https://github.com/GoogleChrome/lighthouse#using-programmatically
The lighthouse API which will be used to build to the database with site feedback

- https://danielkummer.github.io/git-flow-cheatsheet/ GitFlow

- https://travis-ci.org/ Travis CI

# The Project
- [ ] **Step 1: Scaffolding / Setup**
  - [x] Express
  - [x] MongoDB
  - [x] React
  - [x] Mocha/Chai
  - [ ] Heroku
  - [ ] TravisCI
- [ ] **Step 2: Crawling**
  - [ ] Crawl Unit Tests Written and Failing
  - [ ] SimpleCrawler Implementation and Tests Passing
- [ ] **Step 3: Lighthouse API Integration**
  - [ ] Lighthouse API Unit Tests Written and Failing
  - [ ] Lighthouse API Integrated and Basic Tests Passing
- [ ] **Step 4: Putting the Crawl and the Lighthouse API Together**
  - [ ] Unit Test Written and Failing to Feed Crawler a URL and Run Lighthouse on Each Page
  - [ ] Unit Test Passing to Crawl and Test Each Page
- [ ] **Step 5: Saving the Data**
  - [ ] Analyze Lighthouse JSON and Develop DB Schema for Archiving Results
  - [ ] Write Unit Tests for Storing Lighthouse API Data
  - [ ] Unit Tests Passing for Storing Data
  - [ ] Write Unit Tests for Storing All Lighthouse Results From a Successful Crawl
  - [ ] Successful Crawl Lighthouse Results Unit Test Passing
- [ ] **Step 6: Displaying Results**
  - [ ] Create Basic UX / Component Map for Displaying Results of Multiple Sites Reviewed
  - [ ] Write Unit Tests for Displaying Sites and Lighthouse Page Audits
  - [ ] Write React Components to Display Results and Pass Tests

# Setup

**MongoDB Installation (with Homebrew)**
1. `brew install mongodb`
2. `sudo mkdir -p /data/db` (configures local data storage)
3. `sudo chown -R `id -un` /data/db` (provides access to store data locally)

**Development**
1. `npm install -g nodemon` (monitors changes in src file and restarts server as needed)
2. `npm install`
3. `npm run webpack` (1st window to watch for changes and rebuild)
4. `npm run start` (2nd window to run nodemon/express server)
5. `mongod` (3rd window to start local mongoDB server)
