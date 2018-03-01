function parsePerformanceDisplay(category, ChildComponent, toggle, viewCategory, verbiage, hideCategory) {
  let helpRender = [];

  let nodes = crawledLighthouse.map(result => {
    if(result.category[0].helpdisplay.length < 1) {
      return("");
    } else {
      helpRender.push(result.category[0].helpdisplay[0])
      return (<ChildComponent key={result.id}
                              url={result.url}
                              category={result.category[0].items}/>)
    }
  });

  let display;
  if (this.state.toggle === false && helpRender.length < 1) {
    display = ''
  } else if (this.state.toggle === false) {
    display =
      <h5><a href='#/' onClick={ this.viewCategory }>{verbiage}</a>{helpRender[0]}</h5>
  } else {
    display =
    <div>
      <h5><a href='#/' onClick={ this.hideCategory }>{verbiage}</a>{helpRender[0]}</h5>
      {nodes}
    </div>
  }

  return display;
}

let offscreenDisplay = parsePerformanceDisplay("offscreen", "OffscreenImages", "offscreenImagesShow", "viewOffscreenImages", "Offscreen Images", "hideOffscreenImages");
let renderSheetsDisplay = parsePerformanceDisplay("renderSheets", "RenderSheets", "renderSheetsShow", "viewRenderSheets", "Render Stylesheets", "hideRenderSheets");
let renderScriptsDisplay = parsePerformanceDisplay("renderScripts", "RenderScripts", "renderScriptsShow", "viewRenderScripts", "Render Scripts", "hideRenderScripts");
let imageSizeDisplay = parsePerformanceDisplay("imageSize", "ImageSize", "imageSizeShow", "viewImageSize", "Image Size", "hideImageSize");
let optimizeImageDisplay = parsePerformanceDisplay("optimizeImage", "OptimizeImage", "optimizeImageShow", "viewOptimizeImage", "Optimize Images", "hideOptimizeImage");

///



    // // offscreen image mapping
    // let offscreenHelpDisplay = [];
    // let offscreenImageMapNodes = crawledLighthouse.map(result => {
    //   if (result.offscreen[0].helpdisplay.length < 1) {
    //     return ("");
    //   } else {
    //     offscreenHelpDisplay.push(result.offscreen[0].helpdisplay[0])
    //     return (<OffscreenImages  key={result.id}
    //                               url={result.url}
    //                               offscreen={result.offscreen[0].items}/>)
    //   }
    // });
    //
    // let offscreenDisplay;
    // if (this.state.offscreenImagesShow === false && offscreenHelpDisplay.length < 1) {
    //   offscreenDisplay = ''
    // } else if (this.state.offscreenImagesShow === false) {
    //   offscreenDisplay =
    //     <h5><a href='#/' onClick={ this.viewOffscreenImages }>Offscreen Images </a>{offscreenHelpDisplay[0]}</h5>
    // } else {
    //   offscreenDisplay =
    //     <div>
    //       <h5><a href='#/' onClick={ this.hideOffscreenImages }>Offscreen Images </a>{offscreenHelpDisplay[0]}</h5>
    //       {offscreenImageMapNodes}
    //     </div>
    // }
    //
    // // render sheets mapping
    // let renderSheetsHelpDisplay = [];
    // let renderSheetsMapNodes = crawledLighthouse.map(result => {
    //   if (result.renderSheets[0].helpdisplay.length < 1) {
    //     return ("");
    //   } else {
    //     renderSheetsHelpDisplay.push(result.renderSheets[0].helpdisplay)
    //     return (<RenderSheets key={result.id}
    //                           url={result.url}
    //                           renderSheets={result.renderSheets[0].items}/>)
    //   }
    // });
    //
    // let renderSheetsDisplay;
    // if (this.state.renderSheetsShow === false && renderSheetsHelpDisplay.length < 1) {
    //   renderSheetsDisplay = ''
    // } else if (this.state.renderSheetsShow === false) {
    //   renderSheetsDisplay =
    //     <h5><a href='#/' onClick={ this.viewRenderSheets }>Render Stylesheets</a> {renderSheetsHelpDisplay[0]}</h5>
    // } else {
    //   renderSheetsDisplay =
    //     <div>
    //       <h5><a href='#/' onClick={ this.hideRenderSheets }>Render Stylesheets</a> {renderSheetsHelpDisplay[0]}</h5>
    //       {renderSheetsMapNodes}
    //     </div>
    // }
    //
    // // render scripts mapping
    // let renderScriptsHelpDisplay = [];
    // let renderScriptsMapNodes = crawledLighthouse.map(result => {
    //   if (result.renderScripts[0].helpdisplay.length < 1) {
    //     return ("");
    //   } else {
    //     renderScriptsHelpDisplay.push(result.renderScripts[0].helpdisplay)
    //     return (<RenderScripts key={result.id}
    //                           url={result.url}
    //                           renderScripts={result.renderScripts[0].items}/>)
    //   }
    // });
    //
    // let renderScriptsDisplay;
    // if (this.state.renderScriptsShow === false && renderScriptsHelpDisplay.length < 1) {
    //   renderScriptsDisplay = ''
    // } else if (this.state.renderScriptsShow === false) {
    //   renderScriptsDisplay =
    //     <h5><a href='#/' onClick={ this.viewRenderScripts }>Render Scripts</a> {renderScriptsHelpDisplay[0]}</h5>
    // } else {
    //   renderScriptsDisplay =
    //     <div>
    //       <h5><a href='#/' onClick={ this.hideRenderScripts }>Render Scripts</a> {renderScriptsHelpDisplay[0]}</h5>
    //       {renderScriptsMapNodes}
    //     </div>
    // }
    //
    // // image size mapping
    // let imageSizeHelpDisplay = [];
    // let imageSizeMapNodes = crawledLighthouse.map(result => {
    //   if (result.imageSize[0].helpdisplay.length < 1) {
    //     return ("");
    //   } else {
    //     imageSizeHelpDisplay.push(result.imageSize[0].helpdisplay)
    //     return (<ImageSize key={result.id}
    //                         url={result.url}
    //                         imagesSize={result.imageSize[0].items}/>)
    //   }
    // });
    //
    // let imageSizeDisplay;
    // if (this.state.imageSizeShow === false && imageSizeHelpDisplay.length < 1) {
    //   imageSizeDisplay = ''
    // } else if (this.state.imageSizeShow === false) {
    //   imageSizeDisplay =
    //     <h5><a href='#/' onClick={ this.viewImageSize }>Image Size</a> {imageSizeHelpDisplay[0]}</h5>
    // } else {
    //   imageSizeDisplay =
    //     <div>
    //       <h5><a href='#/' onClick={ this.hideImageSize }>Image Size</a> {imageSizeHelpDisplay[0]}</h5>
    //       {imageSizeMapNodes}
    //     </div>
    // }
    //
    // // optimize image mapping
    // let optimizeImageHelpDisplay = [];
    // let optimizeImageMapNodes = crawledLighthouse.map(result => {
    //   if (result.optimizeImage[0].helpdisplay.length < 1) {
    //     return ("");
    //   } else {
    //     optimizeImageHelpDisplay.push(result.optimizeImage[0].helpdisplay)
    //     return (<OptimizeImage key={result.id}
    //                           url={result.url}
    //                           optimizeImages={result.optimizeImage[0].items}/>)
    //   }
    // });
    //
    // let optimizeImageDisplay;
    // if (this.state.optimizeImageShow === false && optimizeImageHelpDisplay.length < 1) {
    //   optimizeImageDisplay = ''
    // } else if (this.state.optimizeImageShow === false) {
    //   optimizeImageDisplay =
    //     <h5><a href='#/' onClick={ this.viewOptimizeImage }>Optimize Images</a> {optimizeImageHelpDisplay[0]}</h5>
    // } else {
    //   optimizeImageDisplay =
    //     <div>
    //       <h5><a href='#/' onClick={ this.hideOptimizeImage }>Optimize Images</a> {optimizeImageHelpDisplay[0]}</h5>
    //       {optimizeImageMapNodes}
    //     </div>
    // }
