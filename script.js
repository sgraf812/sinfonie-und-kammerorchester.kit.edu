

var basePath = "http://sgraf812.github.io/sinfonieorchester.kit.edu/";

//$('head').append('<link rel="stylesheet" href="' + basePath + 'style.css" type="text/css" />');



$(document).ready(function () {

	if ($(".navigation-l1 > .active > a").toArray().some(function (e) {
		return $(e).text() === "Konzerttermine";
	})) {
		$.getJSON(basePath + "./data/konzerttermine.json", function (data) {

			var container = $(".content > .KIT_section.full");
			for (var i = 0; i < data.length; i++) {
				var entry = data[i];
				if (entry.Vergangen) continue;

				container.append("<h1>" + entry.Datum + ", " + entry.Uhrzeit + "</h1>");

				var text = '<div>';

				text += "<em>" + entry.Ort + "</em>";

				text += "<br />";
				text += "<br />";

				for (var j = 0; j < entry.Programm.length; j++) {
					piece = entry.Programm[j];
					text += "<b>" + piece.Komponist + "</b> " + piece.Titel + "<br />";
				}

				//text += "<br />";

				if (entry.Solist)
					text += "<em>Solist:</em> " + entry.Solist + "<br />";

				if (entry.Leitung)
					text += "<div><em>Leitung:</em> " + entry.Leitung;

				text += '</div>';

				container.append(text);
			}
		});
	}

	// I don't understand what this should do
	//$(".nav div").each(function (idx, e) {
	//	$(e).html('<a href="' + $("a:contains('" + e.innerText + "')")[0].href + '">' + e.innerText + '</a>');
	//});

	if ($(".navigation-l1 > .active > a").toArray().some(function (e) {
		return $(e).text() === "Pressestimmen";
	})) {
		$.getJSON(basePath + "data/pressestimmen.json", function (data) {
			var html = "";
			$.each(data, function (key, val) {
				html += "<p>";

				var url = val.Url;

				url = url.replace(/%resources%/g, basePath + "resources");

				html += '<a href="' + url + '">' + val.Title + '</a> ';
				html += val.Text;

				html += "</p>";

			});

			$(".content > .KIT_section.full").append(html);
		});
	}
});
