let data = perfOpp.map( opportunity => {
                  if(opportunity.id === id && opportunity.score < 100) {
                    var offscreenHelp = opportunity.result.helpText.replace(/Learn More/i, 'Learn more: ').replace('[', '').replace('](', '').replace(').', '');
                    var offscreenItems = opportunity.result.details.items;
                    return {
                      helpdisplay: offscreenHelp,
                      display: offscreenItems.map(item => {
                        return " " + item[startIndex].text + " size: " + item[startIndex++].text
                      });
                    }
                    //   helpdisplay.push(offscreenHelp);
                    // var offscreenItems = opportunity.result.details.items;
                    // if (offscreenItems.length > 0) {
                    //   for (var j = 0; j < offscreenItems.length; j++) {
                    //     var item = offscreenItems[j][1].text;
                    //     var size = offscreenItems[j][2].text;
                    //     display.push(" " + item + " size: " + size);
                    //   }
                    // }
                  }
                });