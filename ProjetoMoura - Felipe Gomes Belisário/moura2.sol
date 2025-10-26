// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title RegistroBateriasMoura_Public
 * @dev Contrato para registrar baterias defeituosas com acesso público.
 * Qualquer pessoa pode registrar ou remover um registro.
 */
contract RegistroBateriasMoura_Public {

    // --- Enum e Struct ---
    enum TipoUso { Automotivo, Nautico, Industrial, Estacionaria, Acumulador }

    struct BateriaDefeituosa {
        uint256 id;
        string tipo; // Ex: AGM, EFB
        TipoUso uso;
        string serialNumber;
        uint256 dataProducao; // Timestamp Unix
        string lote;
        uint256 dataRegistro; // Timestamp Unix
    }

    // --- Variáveis de Estado ---
    BateriaDefeituosa[] public listaBateriasDefeituosas;
    mapping(string => uint256) private serialNumberToIndex; // Mapeia N/S para o índice no array
    mapping(string => bool) private serialNumberExists; // Garante que o N/S é único
    uint256 private idCounter;

    // --- Eventos ---
    event BateriaRegistrada(
        uint256 indexed id,
        string serialNumber,
        string tipo,
        TipoUso uso
    );
    event BateriaRemovida(
        uint256 indexed idRemovido,
        string serialNumber
    );

    // --- Funções ---

    /**
     * @dev Registra uma nova bateria defeituosa.
     * Função pública, pode ser chamada por qualquer conta.
     */
    function registrarBateria(
        string memory _tipo,
        TipoUso _uso,
        string memory _serialNumber,
        uint256 _dataProducao,
        string memory _lote
    ) public {
        require(!serialNumberExists[_serialNumber], "Erro: Numero de serie ja registrado.");

        idCounter++;
        uint256 newId = idCounter;
        
        listaBateriasDefeituosas.push(BateriaDefeituosa({
            id: newId,
            tipo: _tipo,
            uso: _uso,
            serialNumber: _serialNumber,
            dataProducao: _dataProducao,
            lote: _lote,
            dataRegistro: block.timestamp
        }));

        // Armazena o índice do novo item (que é o tamanho do array - 1)
        serialNumberToIndex[_serialNumber] = listaBateriasDefeituosas.length - 1;
        serialNumberExists[_serialNumber] = true;

        emit BateriaRegistrada(newId, _serialNumber, _tipo, _uso);
    }

    /**
     * @dev Remove uma bateria usando seu número de série.
     * Função pública, pode ser chamada por qualquer conta.
     * Utiliza o padrão de "trocar e remover" para eficiência de gás.
     */
    function removerBateria(string memory _serialNumber) public {
        require(serialNumberExists[_serialNumber], "Erro: Numero de serie nao encontrado.");

        uint256 indexToRemove = serialNumberToIndex[_serialNumber];
        uint256 lastIndex = listaBateriasDefeituosas.length - 1;

        // Pega o ID da bateria a ser removida para o evento
        uint256 idRemovido = listaBateriasDefeituosas[indexToRemove].id;

        // Se o item a ser removido não for o último do array...
        if (indexToRemove != lastIndex) {
            // ...copia o último item para a posição do item a ser removido.
            BateriaDefeituosa memory lastBattery = listaBateriasDefeituosas[lastIndex];
            listaBateriasDefeituosas[indexToRemove] = lastBattery;
            // Atualiza o índice do item que foi movido.
            serialNumberToIndex[lastBattery.serialNumber] = indexToRemove;
        }

        // Remove o último item do array (que agora é um duplicado ou o item original).
        listaBateriasDefeituosas.pop();

        // Limpa os mapeamentos do item removido.
        delete serialNumberExists[_serialNumber];
        delete serialNumberToIndex[_serialNumber];

        emit BateriaRemovida(idRemovido, _serialNumber);
    }

    // --- Funções de Leitura (View) ---

    /**
     * @dev Retorna a lista completa de baterias defeituosas registradas.
     */
    function listarBaterias() public view returns (BateriaDefeituosa[] memory) {
        return listaBateriasDefeituosas;
    }

    /**
     * @dev Retorna a contagem total de baterias registradas.
     */
    function getContagemTotal() public view returns (uint256) {
        return listaBateriasDefeituosas.length;
    }

    /**
     * @dev Consulta uma bateria pelo seu número de série.
     */
    function getBateriaPorSerial(string memory _serialNumber) public view returns (BateriaDefeituosa memory) {
        require(serialNumberExists[_serialNumber], "Erro: Numero de serie nao encontrado.");
        uint256 index = serialNumberToIndex[_serialNumber];
        return listaBateriasDefeituosas[index];
    }
}