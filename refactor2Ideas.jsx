function parseLHOpportunity (name, startIndex) {
                let data = {
                  helpdisplay: [],
                  display: [],
                };

                for (var i = 0; i < perfOpp.length; i++) {
                  if(perfOpp[i].id === name && perfOpp[i].score < 100) {
                    var offscreenHelp = perfOpp[i].result.helpText.replace(/Learn More/i, 'Learn more: ').replace('[', '').replace('](', '').replace(').', '');
                    data.helpdisplay.push(offscreenHelp);
                    var offscreenItems = perfOpp[i].result.details.items;
                    if (offscreenItems.length > 0) {
                      for (var j = 0; j < offscreenItems.length; j++) {
                        var item = offscreenItems[j][startIndex].text;
                        var size = offscreenItems[j][startIndex++].text;
                        data.display.push(" " + item + " size: " + size);
                      }
                    }
                  }
                }

                return data;
              }

              let offscreen = parseLHOpportunity("offscreen-images", 1);