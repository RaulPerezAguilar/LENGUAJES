<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
                <h3>Mi catalogo de figuras (COMPLETO)</h3>
                <table border="1">
                    <tr bgcolor="#9acd32">
                        <th style="text-align:left">nombre</th>
                        <th style="text-align:left">categoria</th>
                        <th style="text-aling:left">cuantia</th>
                        <th style="text-aling:left">moneda</th>
                    </tr>
                    <xsl:for-each
                        select="/catalogo/producto">
                        <!--
                        CATALOGO QUE MUESTRA TODOS LOS PRODUCTOS
                        -->
                        <tr>
                            <td>
                                <xsl:value-of select="nombre" />
                            </td>
                            <td>
                                <xsl:value-of select="categoria" />
                            </td>
                            <td>
                                <xsl:value-of select="cuantia" />
                            </td>
                            <td>
                                <xsl:value-of select="moneda" />
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>

                <br></br>
                <h3>Mi catalogo de figuras (SOLO PRODUCTOS DE UNCHARTED O DE THE LAST OF US)</h3>
                <table border="1">
                    <tr bgcolor="#9acd32">
                        <th style="text-align:left">nombre</th>
                        <th style="text-align:left">categoria</th>
                        <th style="text-aling:left">cuantia</th>
                        <th style="text-aling:left">moneda</th>
                    </tr>
                    <xsl:for-each
                        select="/catalogo/producto[categoria='Uncharted'or categoria='The last of us']">
                        <!--
                                MOSTRAR UNCAMENTE UNCHARTED O THE LAST OF US
                                -->
                            <tr>
                            <td>
                                <xsl:value-of select="nombre" />
                            </td>
                            <td>
                                <xsl:value-of select="categoria" />
                            </td>
                            <td>
                                <xsl:value-of select="cuantia" />
                            </td>
                            <td>
                                <xsl:value-of select="moneda" />
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
                <br></br>
                <h3>Mi catalogo de figuras (PRECIOS MAYOR A 100)</h3>
                <table border="1">
                    <tr bgcolor="#9acd32">
                        <th style="text-align:left">nombre</th>
                        <th style="text-align:left">categoria</th>
                        <th style="text-aling:left">cuantia</th>
                        <th style="text-aling:left">moneda</th>
                    </tr>
                    <xsl:for-each
                        select="/catalogo/producto[cuantia > '100']">
                        <!-- 
                        MOSTRAR UNCAMENTE PRECIOS MAYOR A 100 <tr>
                        -->
                        <tr>
                            <td>
                                <xsl:value-of select="nombre" />
                            </td>
                            <td>
                                <xsl:value-of select="categoria" />
                            </td>
                            <td>
                                <xsl:value-of select="cuantia" />
                            </td>
                            <td>
                                <xsl:value-of select="moneda" />
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
                <br></br>
                <h3>Mi catalogo de figuras (PRECIOS MENOR A 100)</h3>
                <table border="1">
                    <tr bgcolor="#9acd32">
                        <th style="text-align:left">nombre</th>
                        <th style="text-align:left">categoria</th>
                        <th style="text-aling:left">cuantia</th>
                        <th style="text-aling:left">moneda</th>
                    </tr>
                    <xsl:for-each
                        select="/catalogo/producto[100 > cuantia]">
                        <!--
                            MOSTRAR UNCAMENTE PRECIOS MENOR A 100 
                            -->
                            <tr>
                            <td>
                                <xsl:value-of select="nombre" />
                            </td>
                            <td>
                                <xsl:value-of select="categoria" />
                            </td>
                            <td>
                                <xsl:value-of select="cuantia" />
                            </td>
                            <td>
                                <xsl:value-of select="moneda" />
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
                <br></br>
                <h3>Mi catalogo de figuras (UNCHARTED Y THE LAST OF US ADEMAS DE MAS DE 100 )</h3>
                <table border="1">
                    <tr bgcolor="#9acd32">
                        <th style="text-align:left">nombre</th>
                        <th style="text-align:left">categoria</th>
                        <th style="text-aling:left">cuantia</th>
                        <th style="text-aling:left">moneda</th>
                    </tr>
                    <xsl:for-each
                        select="/catalogo/producto[categoria='Uncharted' and cuantia > '100' or categoria='The last of us' and cuantia > '100']">
                        <!--
                        MOSTRAR UNCAMENTE CATEGORIAS UNCHARTED O THE LAST OF US Y QUE CUESTEN MAS DE 100
                        -->
                        <tr>
                            <td>
                                <xsl:value-of select="nombre" />
                            </td>
                            <td>
                                <xsl:value-of select="categoria" />
                            </td>
                            <td>
                                <xsl:value-of select="cuantia" />
                            </td>
                            <td>
                                <xsl:value-of select="moneda" />
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
                <br></br>
                <h3>Mi catalogo de figuras (SI DESCRIPCION TIENE mundo)</h3>
                <table border="1">
                    <tr bgcolor="#9acd32">
                        <th style="text-align:left">nombre</th>
                        <th style="text-align:left">categoria</th>
                        <th style="text-aling:left">cuantia</th>
                        <th style="text-aling:left">moneda</th>
                    </tr>
                    <xsl:for-each
                        select="/catalogo/producto[contains(text(),'mundo')]">
                        <!--
                        DESCRIPCION CONTIENE mundo 
                        -->
                        <tr>
                            <td>
                                <xsl:value-of select="nombre" />
                            </td>
                            <td>
                                <xsl:value-of select="categoria" />
                            </td>
                            <td>
                                <xsl:value-of select="cuantia" />
                            </td>
                            <td>
                                <xsl:value-of select="moneda" />
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>