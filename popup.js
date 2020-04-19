var API = chrome || browser;
API.storage.sync.get("ua", function(result) {
	if (result.ua == undefined) {
		alert("Ainda nao foi definido um User-Agent para a extensao. Sera definido agora");
		var ua = navigator.userAgent;
		API.storage.sync.set({"ua": ua}, function() {
			alert('User-Agent definido: ' + ua);
		});
	}
});

var botaoAlterarUA = document.getElementById("alterar_ua");
botaoAlterarUA.addEventListener('click', function() {
	API.tabs.getSelected(null, function(tab) {
		API.storage.sync.get("ua", function(result) {
			let pergunta_ua = prompt("Digite o User-Agent desejado:", result.ua);
			if (pergunta_ua != null && pergunta_ua != "") {
				if (confirm("Confirma User-Agent: " + pergunta_ua + " ?")) {
					API.storage.sync.set({"ua": pergunta_ua}, function(result) {
						alert("Novo User-Agent configurado!");
					});
				}
			}
		});
	});

}, false);

var botaoResetarUA = document.getElementById("resetar_ua");
botaoResetarUA.addEventListener('click', function() {
	API.tabs.getSelected(null, function(tab) {
		if (confirm("Confirma que quer resetar o User-Agent?")) {
			API.storage.sync.set({"ua": navigator.userAgent}, function(result) {
				alert("User-Agent resetado!");
			});
		}
	});
}, false);