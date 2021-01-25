export default async function soundcloud(url){
  if(!/soundcloud|sc.com/.test(url)){
    return
  }

  var formData = new FormData();
  formData.append("format", "json");
  formData.append("url", url);
  try{
    const res = await fetch('http://soundcloud.com/oembed', {
      method: 'POST',
      body: formData
    })
    const body = await res.json()
    return body.html
  }
  catch(e){
    console.log("Couldn't fetch soundcloud embed for ", url)
    return
  }

}