<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">


        <html>
            <body>
                <h1>Curriculum vitae</h1>
                <h2>
                    Nombre:
                    <xsl:value-of select="nombre"></xsl:value-of>
                </h2>
                <h2>
                    Apellidos:
                    <xsl:value-of select="apellidos"></xsl:value-of>
                </h2>
                <h2>
                    Fecha_nacimiento:
                    <xsl:value-of select="fecha_nacimiento"></xsl:value-of>
                </h2>
                <img>
                    <xsl:attribute name="src">
                        <xsl:value-of select="//foto_personal"></xsl:value-of>
                    </xsl:attribute>
                    <xsl:attribute name="width">
               100px

              </xsl:attribute>
                </img>
                <h2>
                    Blog personal:
                    <xsl:value-of select="blog_personal"></xsl:value-of>
                </h2>

                <h2>Redes Sociales</h2>
                <ul>
                    <xsl:for-each select="//rrss/red_social">
                        <li>
                            <img>

                                <xsl:attribute name="src">
                                    <xsl:value-of select="//logo"></xsl:value-of>
                                </xsl:attribute>
                            </img>
                        </li>

                        <li>

                            <xsl:value-of select="//red_social/nombre"></xsl:value-of>
                        </li>

                        <li>
                            <a>
                                <xsl:attribute name="href">
                                    <xsl:value-of select="//rrss/red_social/enlace"></xsl:value-of>
                                </xsl:attribute>

                                <xsl:value-of select="enlace"></xsl:value-of>

                            </a>
                        </li>
                    </xsl:for-each>
                </ul>


                <h2>Formación academica</h2>
                <h3>Titulaciones:</h3>
                <ul>
                    <xsl:for-each select="//titulo">
                        <li>
                            <xsl:value-of select="nombre"></xsl:value-of>
                        </li>

                    </xsl:for-each>


                </ul>
                <h2>Idiomas:</h2>
                <ul>
                    <xsl:for-each select="//idiomas/idioma">
                        <h4>

                            <xsl:value-of select="nombre"></xsl:value-of>
                        </h4>
                        <h4>Niveles:</h4>
                        <ul>
                            <li>
                                Reading:
                                <xsl:value-of select="//reading"></xsl:value-of>
                            </li>
                            <li>
                                Writing:
                                <xsl:value-of select="//writing"></xsl:value-of>
                            </li>
                            <li>
                                Speaking:
                                <xsl:value-of select="//speaking"></xsl:value-of>
                            </li>
                            <h4>Academia:</h4>
                            <xsl:value-of select="academia_curso"></xsl:value-of>

                        </ul>


                    </xsl:for-each>

                    <h2>Expesiencia Laboral</h2>
                    
                    <xsl:for-each select="//experiencia_laboral/trabajos/trabajo">
                    <h3>Trabajo:</h3>
                    <ul>
                    <li>
                        Nombre:
                        <xsl:value-of select="nombre_trabajo"></xsl:value-of>
                    </li>
                    <li>
                        Descipción:
                        <xsl:value-of select="descripcion"></xsl:value-of>
                    </li>
                    <li>
                        Fecha_inicio
                        <xsl:value-of select="@fecha_inicio"></xsl:value-of>

                    </li>
                </ul>

                </xsl:for-each>
                </ul>

            </body>
        </html>

    </xsl:template>
</xsl:stylesheet>