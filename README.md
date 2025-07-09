# 🏥 MD Dermatologia Integrada - Dr. Roberto Luís Rezende

Site oficial da clínica de dermatologia do Dr. Roberto Luís Rezende em Porto Alegre/RS.

## 📋 Visão Geral

Este é um site moderno, responsivo e otimizado para SEO, desenvolvido com:
- **HTML5** semântico e acessível
- **CSS3** com **Tailwind CSS** para design responsivo
- **JavaScript** modular para interatividade
- **AOS Library** para animações suaves
- **Google Reviews** integrado
- **WhatsApp** flutuante sempre presente

## 🎨 Design e Cores

### Paleta de Cores Oficial
- **Verde Claro**: `#ECFAE5`
- **Verde Médio**: `#DDF6D2`
- **Verde Forte**: `#CAE8BD`
- **Verde Escuro**: `#B0DB9C`

### Características do Design
- Design "mobile-first" totalmente responsivo
- Navegação fixa com smooth-scrolling
- Animações suaves e micro-interações
- Carrossel automático de fotos da clínica
- Integração com Google Maps

## 📁 Estrutura de Arquivos

```
/public
├── index.html          # Página principal
├── styles.css          # Estilos customizados
├── script.js           # JavaScript modular
├── config.json         # Configurações e textos
├── README.md           # Este arquivo
└── /img               # Diretório de imagens
    ├── logo.png           # Logo da clínica (substitua aqui)
    ├── hero-background.jpg # Imagem de fundo hero (substitua aqui)
    ├── dr-roberto.jpg     # Foto do Dr. Roberto (substitua aqui)
    ├── clinica-1.jpg      # Foto recepção (substitua aqui)
    ├── clinica-2.jpg      # Foto consultório (substitua aqui)
    ├── clinica-3.jpg      # Foto sala de espera (substitua aqui)
    ├── clinica-4.jpg      # Foto equipamentos (substitua aqui)
    └── clinica-5.jpg      # Foto instalações (substitua aqui)
```

## 🖼️ Substituição de Imagens

### Imagens Obrigatórias para Substituir

#### 1. Logo da Clínica
- **Arquivo**: `img/logo.png`
- **Dimensões**: 200x80px (ou proporção 2.5:1)
- **Formato**: PNG com fundo transparente
- **Comentário no código**: `<!-- substitua aqui -->`

#### 2. Foto do Dr. Roberto
- **Arquivo**: `img/dr-roberto.jpg`
- **Dimensões**: 400x500px mínimo
- **Formato**: JPG ou PNG
- **Descrição**: Foto profissional do médico
- **Alt text**: "Dr. Roberto Luís Rezende - Dermatologista especialista"

#### 3. Imagem Hero (Fundo)
- **Arquivo**: `img/hero-background.jpg`
- **Dimensões**: 1920x1080px mínimo
- **Formato**: JPG otimizado
- **Descrição**: Imagem relacionada à medicina/dermatologia

#### 4. Fotos da Clínica (5 fotos)
- **Arquivos**: `clinica-1.jpg` até `clinica-5.jpg`
- **Dimensões**: 800x600px mínimo
- **Formato**: JPG otimizado
- **Descrições**:
  - `clinica-1.jpg`: Recepção da clínica
  - `clinica-2.jpg`: Consultório médico
  - `clinica-3.jpg`: Sala de espera
  - `clinica-4.jpg`: Equipamentos médicos
  - `clinica-5.jpg`: Corredores/instalações

### Como Substituir as Imagens

1. **Prepare as imagens** nas dimensões recomendadas
2. **Otimize** usando ferramentas como TinyPNG ou Squoosh
3. **Substitua** os arquivos mantendo os mesmos nomes
4. **Teste** o carregamento em diferentes dispositivos

### Dicas de Otimização

- **Compressão**: Use qualidade 80-85% para JPG
- **Formatos modernos**: Considere WebP para melhor performance
- **Responsive**: Imagens devem funcionar bem em mobile
- **Alt texts**: Sempre inclua descrições acessíveis

## ⚙️ Personalização de Conteúdo

### Arquivo config.json

O arquivo `config.json` contém todos os textos e configurações estruturadas:

```json
{
  "medico": {
    "nome": "Dr. Roberto Luís Rezende",
    "crm": "CRM-RS 25079",
    "rqe": "RQE 15774"
  },
  "contato": {
    "telefone": "(51) 3377.3333",
    "whatsapp": "(51) 99193-3393"
  }
}
```

### Principais Seções para Personalizar

#### 1. Informações do Médico
- Nome completo
- CRM e RQE
- Currículo e formação
- Especialidades

#### 2. Dados da Clínica
- Nome da clínica
- Histórico e descrição
- Endereço completo

#### 3. Contatos
- Telefone fixo
- WhatsApp (número e link)
- Endereço físico
- Google Maps iframe

#### 4. Áreas de Atuação
- Descrições dos procedimentos
- Detalhes dos tratamentos
- Informações técnicas

## 🚀 Deploy e Hospedagem

### Pré-requisitos
- Servidor web (Apache/Nginx)
- PHP não é necessário (site estático)
- Certificado SSL recomendado

### Processo de Deploy

#### 1. Upload dos Arquivos
```bash
# Exemplo usando FTP/SFTP
scp -r ./public/* usuario@servidor:/var/www/html/
```

#### 2. Configuração do Servidor

**Apache (.htaccess)**
```apache
# Força HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Compressão GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache Headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

#### 3. Teste de Performance
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **Lighthouse**: Integrado no Chrome DevTools

### Domínio e SEO

#### 1. Configuração de Domínio
- Atualize o campo `canonical` no HTML
- Configure redirects www/não-www
- Implemente SSL/TLS

#### 2. Google Search Console
- Adicione o site
- Submeta o sitemap
- Configure Google Analytics

#### 3. Meta Tags para Atualizar
```html
<!-- Atualize estas URLs -->
<link rel="canonical" href="https://seudominio.com.br">
<meta property="og:url" content="https://seudominio.com.br">
```

## 📱 Testes de Responsividade

### Dispositivos para Testar
- **Mobile**: iPhone SE, iPhone 12, Samsung Galaxy
- **Tablet**: iPad, Android tablets
- **Desktop**: 1920x1080, 1366x768, 4K

### Ferramentas de Teste
- Chrome DevTools (Device Mode)
- Firefox Responsive Design Mode
- BrowserStack para testes multiplataforma

## 🔧 Manutenção

### Atualizações Regulares

#### 1. Conteúdo
- Atualizar informações de contato
- Adicionar novos procedimentos
- Atualizar fotos da clínica

#### 2. Técnico
- Verificar links quebrados
- Atualizar dependências CDN
- Monitorar performance

#### 3. SEO
- Atualizar meta descriptions
- Adicionar novos conteúdos
- Monitorar palavras-chave

### Backup
- Faça backup regular dos arquivos
- Mantenha versão local atualizada
- Documente alterações importantes

## 🎯 Métricas de Performance

### Metas de Lighthouse
- **Performance**: ≥ 90
- **Accessibility**: ≥ 95
- **Best Practices**: ≥ 90
- **SEO**: ≥ 95

### Otimizações Implementadas
- Imagens otimizadas e lazy loading
- CSS e JS minificados
- Preconnect para recursos externos
- Service Worker para cache (futuro)

## 📞 Contatos de Emergência

### Links Importantes
- **WhatsApp**: https://wa.me/5551991933393
- **Telefone**: (51) 3377.3333
- **Google Maps**: Link integrado no site

### Widget do Google Reviews
- **ID do Widget**: `b65343b6-bf45-4c94-a143-037fd7c4c822`
- **Script**: https://static.elfsight.com/platform/platform.js

## 🆘 Suporte Técnico

### Problemas Comuns

#### 1. Imagens não carregam
- Verifique caminhos relativos
- Confirme upload correto
- Teste permissões de arquivo

#### 2. WhatsApp não funciona
- Confirme número correto
- Teste link manualmente
- Verifique codificação da mensagem

#### 3. Google Reviews não aparecem
- Confirme ID do widget
- Teste em navegador diferente
- Verifique console de erros

### Como Reportar Problemas
1. Descreva o problema detalhadamente
2. Inclua screenshots/vídeos
3. Informe dispositivo e navegador
4. Forneça URL da página com problema

## 📋 Checklist de Deploy

### Antes do Deploy
- [ ] Todas as imagens substituídas
- [ ] Informações de contato atualizadas
- [ ] Textos revisados e corretos
- [ ] Links WhatsApp testados
- [ ] Mapa Google funcionando

### Durante o Deploy
- [ ] Upload de todos os arquivos
- [ ] Configuração do servidor
- [ ] Teste de todas as páginas
- [ ] Verificação mobile/desktop

### Após o Deploy
- [ ] Teste de performance
- [ ] Configuração Google Analytics
- [ ] Submissão para Search Console
- [ ] Teste de formulários (se existirem)
- [ ] Backup da versão final

---

## 💡 Dicas Finais

1. **Sempre teste localmente** antes do deploy
2. **Mantenha backups** de todas as versões
3. **Monitore analytics** regularmente
4. **Atualize conteúdo** periodicamente
5. **Otimize imagens** antes do upload

Para dúvidas técnicas ou suporte, consulte a documentação das tecnologias utilizadas ou entre em contato com a equipe de desenvolvimento.

**Sucesso com seu novo site! 🚀**