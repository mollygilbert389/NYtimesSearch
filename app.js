
//////////////////VARIABLES///////////////////////////////////
var authKey = "uMqaZhU2l20bE6XXjaeDYzL5U8JiQYAS";
var urlBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey; //&q=election 

var queryTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;
var articleCount = 0;
// numArticles = 10;

//////////////////FUNCTIONS///////////////////////////////////
function runQuery (numArticles, queryUrl) {
    $.ajax({url: queryUrl, method: "GET"})
    .done(function(NYTData){ 
        $("#wellSection").empty();
        for (i=0; i < numArticles; i++) {

            var wellSection = $("<div>");
            wellSection.addClass("well");
            wellSection.attr("id", "articleWell-" + i);
            $("#wellSection").append(wellSection)

            if (NYTData.response.docs[i].headline.main != "null") {
                console.log(NYTData.response.docs[i].headline.main)
                $("#articleWell-" + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>")
            }
            
            if (NYTData.response.docs[i].byline.original && NYTData.response.docs[i].byline != "null" ) {
                console.log(NYTData.response.docs[i].byline.original)
                $("#articleWell-" + i).append("<h4>" + NYTData.response.docs[i].byline.original + "</h4>")
            }

            $("#articleWell-" + i).append("<h6>" + NYTData.response.docs[i].pub_date + "</h6>")
            $("#articleWell-" + i).append("<h7>" + NYTData.response.docs[i].news_desk + "</h7>" + "<br>")
            $("#articleWell-" + i).append("<a href=" + NYTData.response.docs[i].web_url + ">" + NYTData.response.docs[i].web_url + "<a>")

        }

        console.log(queryUrl);
        console.log(numArticles)
        console.log(NYTData)

    })

} 

$("#searchBtn").on('click', function() {
    queryTerm = $("#search").val().trim();
    numResults = $("#numRecords").val();
    startYear = $("#startYear").val().trim();
    endYear = $("#endYear").val().trim();

    var newUrl = urlBase + "&q=" + queryTerm;

    if (parseInt(startYear)) {
        startYear = startYear + "0101"
        newUrl = newUrl + "&begin_date=" + startYear;
    }
    if (parseInt(endYear)) {
        endYear = endYear + "0101"
        newUrl = newUrl + "&end_date=" + endYear;
    }
    
    runQuery(numResults, newUrl) 

    return false;
})

$("#clear").on("click", function(){
    $("#wellSection").empty();
    document.getElementById("").reset()

})
