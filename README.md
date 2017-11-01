# Rust, Başlarken

Rust programlama dilini öğreten internet sitesi. Bu depo kaynak materyalleri içermektedir. 
İki ana bölüme ayrılmıştır:

- `src` -- jekyll dosyalarını içerir
- `docs` -- github sayfaları için 'render' jekyll dosyalarını içerir 
- `keynote` -- sunumlar için kaynak metinleri içerir

# İnternet sitesi

### henüz yapmadıysanız jekyll yükleyin

Burada bir şeyler yapmaya başlamak istiyorsanız jekyll kullanmalısınız. Ben
[rbenv](https://github.com/rbenv/rbenv) kullanıyorum. Burada kullandığım 
Ruby sürümünü `.ruby-version` kısmında kontrol edebilirsiniz. 
Hazırda yüklü rbenv mevcut ise, depoyu kontrol edebilir, jekyll dosyalarını içeren klasöre atlayabilir
ve üzerinde çalışabilirsiniz:
```
cd src
bundle install
```

### değişklikleri görüntüleyin

yaptığınız değişiklikleri görüntülemek için:

```
cd src
bundle exec jekyll serve
```

yaptığınız değişikliklerin görüntüleneceği adres: `http://127.0.0.1:4000`

### Building and putting the sources live

`intorust.com` yansıları `docs`  üzerinde github sayfalarını kullanarak çalışır. Yaptığınız değişiklikleri kurmak için:

```
cd src
jekyll build -d ../docs
```

Böylece `docs` doğrudan güncellenmiş olur. Şimdi yapmanız gereken github sayfalarını kullanarak 'commit' edin.

# Lisans

Tüm içerikler MIT ve Apache altında lisanslanmıştır. =)
Yapılacak katkılar bu lisanslar altında yayınlanmalıdır.
