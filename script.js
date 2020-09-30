

var basePath = "http://fixpt.de/sinfonieorchester.kit.edu/";

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

				container.append('<div class="firstline">' + entry.Ort + '</div>');

				var text = '<div class="text">';

				text += "<div>" + entry.Orchester + "</div>";

				text += "<br />";

				for (var j = 0; j < entry.Programm.length; j++) {
					piece = entry.Programm[j];
					text += "<em>" + piece.Komponist + ":</em> " + piece.Titel + "<br />";
				}

				text += "<br />";

				if (entry.Solist)
					text += "<div><em>Solist:</em> " + entry.Solist + "</div>";

				if (entry.Leitung)
					text += "<div><em>Leitung:</em> " + entry.Leitung + "</div>";

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
