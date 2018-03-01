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
