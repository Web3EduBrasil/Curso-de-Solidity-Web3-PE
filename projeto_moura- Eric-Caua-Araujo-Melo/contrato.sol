//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract bateriasMoura{
    address private dono;
    enum Uso{Automotivo, Nautico, Industrial}

    struct Bateria{
        string tipo;
        Uso uso;
        uint nr_serie;
        string dataprod;
        string lote;
    }

    Bateria[] private bateriasDefeituosas;

    constructor(){
        dono = msg.sender;
    }
    modifier onlyOwner{
        require(msg.sender == dono, "Somente o proprietario pode acessar essa opcao ");
        _;
        }
    modifier options(uint resp, uint inicio, uint fim){
        require(resp > inicio && resp < fim, "Valor invalido ");
        _;
        }
    function instrucao() public pure returns(string memory){
        return "Em uso, preencha com:\n [1] para Automotivo\n [2] para Nautico\n [3] para Industrial";
    }

    Bateria public baterias;

    function atribuirValores(
        string memory _tipo,
        uint _uso,
        uint _nrserie,
        string memory _dataprod,
        string memory _lote) public onlyOwner options(_uso, 0, 4){
            baterias = Bateria({tipo:_tipo, uso:Uso(_uso-1), nr_serie:_nrserie, dataprod:_dataprod, lote:_lote});
            bateriasDefeituosas.push(baterias);
            }
    function listar(uint id) public view onlyOwner options(id,0,bateriasDefeituosas.length+1) returns (Bateria memory){
        return bateriasDefeituosas[id-1];
    }
}