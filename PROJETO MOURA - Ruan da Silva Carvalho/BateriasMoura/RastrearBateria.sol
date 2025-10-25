// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract RastrearBateria {
    struct Bateria {
        string tipo;
        string uso;
        string nr_serie;
        string dataprod;
        string lote;
        string defeito;
    }

    struct DefeitoInfo {
        string codigo;
        string descricao;
    }

    address public dono;
    Bateria[] private batteries;
    DefeitoInfo[] private defeitosDisponiveis;

    constructor() {
        dono = msg.sender;
        // Inicializar lista de defeitos disponíveis
        defeitosDisponiveis.push(DefeitoInfo("D01", "Curto interno"));
        defeitosDisponiveis.push(DefeitoInfo("D02", "Vazamento acido"));
        defeitosDisponiveis.push(DefeitoInfo("D03", "Baixa capacidade"));
        defeitosDisponiveis.push(DefeitoInfo("D04", "Falha na selagem"));
        defeitosDisponiveis.push(DefeitoInfo("D05", "Conector solto"));
        defeitosDisponiveis.push(DefeitoInfo("D06", "Oxidacao"));
        defeitosDisponiveis.push(DefeitoInfo("D07", "Falha carga"));
        defeitosDisponiveis.push(DefeitoInfo("D08", "Tensao fora do padrao"));
    }

    modifier apenasDono() {
        require(msg.sender == dono, "Apenas o dono pode executar esta funcao");
        _;
    }

    function listarDefeitosDisponiveis() public view returns (DefeitoInfo[] memory) {
        return defeitosDisponiveis;
    }

    function cadastrarBateria(
        string memory _tipo,
        string memory _uso,
        string memory _nr_serie,
        string memory _dataprod,
        string memory _lote,
        string memory _defeito
    ) public apenasDono {
        batteries.push(Bateria(_tipo, _uso, _nr_serie, _dataprod, _lote, _defeito));
    }

    function listarBaterias() public view returns (Bateria[] memory) {
        return batteries;
    }

    function removerBateria(uint256 _id) public apenasDono {
        require(_id < batteries.length, "ID invalido");
        delete batteries[_id];
    }

    function getTipo(uint256 _id) public view returns (string memory) {
        require(_id < batteries.length, "ID invalido");
        return batteries[_id].tipo;
    }

    function getUso(uint256 _id) public view returns (string memory) {
        require(_id < batteries.length, "ID invalido");
        return batteries[_id].uso;
    }

    function getNrSerie(uint256 _id) public view returns (string memory) {
        require(_id < batteries.length, "ID invalido");
        return batteries[_id].nr_serie;
    }

    function getDataProd(uint256 _id) public view returns (string memory) {
        require(_id < batteries.length, "ID invalido");
        return batteries[_id].dataprod;
    }

    function getLote(uint256 _id) public view returns (string memory) {
        require(_id < batteries.length, "ID invalido");
        return batteries[_id].lote;
    }

    function getDefeito(uint256 _id) public view returns (string memory) {
        require(_id < batteries.length, "ID invalido");
        return batteries[_id].defeito;
    }

    function setTipo(uint256 _id, string memory _tipo) public apenasDono {
        require(_id < batteries.length, "ID invalido");
        batteries[_id].tipo = _tipo;
    }

    function setUso(uint256 _id, string memory _uso) public apenasDono {
        require(_id < batteries.length, "ID invalido");
        batteries[_id].uso = _uso;
    }

    function setNrSerie(uint256 _id, string memory _nr_serie) public apenasDono {
        require(_id < batteries.length, "ID invalido");
        batteries[_id].nr_serie = _nr_serie;
    }

    function setDataProd(uint256 _id, string memory _dataprod) public apenasDono {
        require(_id < batteries.length, "ID invalido");
        batteries[_id].dataprod = _dataprod;
    }

    function setLote(uint256 _id, string memory _lote) public apenasDono {
        require(_id < batteries.length, "ID invalido");
        batteries[_id].lote = _lote;
    }

    function setDefeito(uint256 _id, string memory _defeito) public apenasDono {
        require(_id < batteries.length, "ID invalido");
        batteries[_id].defeito = _defeito;
    }

    function transferirDono(address _novoDono) public apenasDono {
        require(_novoDono != address(0), "Endereco invalido");
        dono = _novoDono;
    }
}
