//for crawler
let excludedUrls = ['https://google.com', '.jpg', '.pdf', 'mailto:', 'https://twitter.com', 'https://facebook.com', 'https://accounts.google.com'];

      return !excludedUrls.includes(url);


// not sure how to incorporate this with the first bit:

//if (url.indexOf(currentUrl) < 0) {
//    return false; // does not allow crawling outside main site
//  }

// though it appears to remain on the current site if I just leave that bit at the top still. The main issue is that it still shows all .jpg and .pdf, perhaps because of the .includes not splicing up the string i.e.

//var pets = ['cat', 'dog', 'bat'];
// console.log(pets.includes('cat'));
// expected output: true
// console.log(pets.includes('at'));
// expected output: false


// tried to manipulate .indexOf with the refactor but it gets stuck.
