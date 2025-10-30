# Rapport et réponses aux questions 

## TD1

### q1 ) 

Le dépôt et les codes sont trouvables [ici](https://github.com/Pallandos/mini-monitoring).

### q2 )

Le fichier `package.json` défini toutes les commandes que l'on peut lancer avec `node`, le nom du package, les emplacements des binaires etc. Je l'ai un petit peu modifié pour changer le nom du module par exemple. Ce fichier défini aussi les **dependencies** (que l'on installe avec `npm`). 

Le ficheir `package-lock.json` est généré automatiquement lui, et défini les dépendances des dépendances. Lors de l'installation via `npm` par l'utilisateur, `npm` va regarder si ce paquet dépend d'autres *dependencies*, et cela est inscrit dans le `package-lock.json`, ce qui évite de le refaire plus tard.

### q3 )

Lorsque j'installe `systeminformation` cela ajoute ce package comme *dependecie* dnas `package.json`. La principale différence entre *dependencies* et *devDependencies* est que uniquement les premières sont **nécessaires** au fonctionement en production (installées par `npm install`) alors que les autres seront ignorées dans un environement de production (`npm install --production` les ignore).

### q4 )

Il faut bien faire attention aux *dependencies* et cela peut être piegeur.

### q5 )

J'ai testé mon server avec [Thunder Client](https://docs.thunderclient.com/) un client API REST. Voici un extrait des réponses :

```json
{
  "cpu": {
    "manufacturer": "Intel",
    "brand": "Core™ i5-8350U",
    "vendor": "Intel",
    "family": "6",
    "model": "142",
    "stepping": "10",
    "revision": "",
    "voltage": "",
    "speed": 1.7,
    "speedMin": 0.4,
    "speedMax": 3.6,
    "governor": "powersave",
    "cores": 8,
    "physicalCores": 4,
    "performanceCores": 4,
    "efficiencyCores": 0,
    "processors": 1,
    "socket": "",
    "flags": "fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx pdpe1gb rdtscp lm constant_tsc art arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc cpuid aperfmperf pni pclmulqdq dtes64 monitor ds_cpl vmx smx est tm2 ssse3 sdbg fma cx16 xtpr pdcm pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand lahf_lm abm 3dnowprefetch cpuid_fault epb pti ssbd ibrs ibpb stibp tpr_shadow flexpriority ept vpid ept_ad fsgsbase tsc_adjust sgx bmi1 avx2 smep bmi2 erms invpcid mpx rdseed adx smap clflushopt intel_pt xsaveopt xsavec xgetbv1 xsaves dtherm ida arat pln pts hwp hwp_notify hwp_act_window hwp_epp vnmi md_clear flush_l1d arch_capabilities",
    "virtualization": true,
    "cache": {
      "l1d": 131072,
      "l1i": 131072,
      "l2": 1048576,
      "l3": 6291456
    }
  },
  "system": {
    "manufacturer": "LENOVO",
    "model": "20L6S1LV09",
    "version": "ThinkPad T480",
    "serial": "-",
    "uuid": "",
    "sku": "-",
    "virtual": false
  },
}
```

Le formalisme utilisé est classique dans le cas des API, et cela permet de construire une architecture à bases de micro services, et donc d'inclure notre API dans des applications de manière modulaire. 

### q6 )

Le jeu de test que j'ai écrit va vérifier la structure du json renvoyé, en particulier les champs tels que *cpu*, *system*, *load* etc... Cela permet de confirmer que l'application a bien le comportement attendu. 

## TD2 

### Q4 )

Le flag `-p` permet d'exposer des ports entre l'hôte et le conteneur. Par exemple la syntaxe `-p 3000:3001` va lier le port 3000 de l'hôte et le port 3001 du conteneur. Cela signifie que toute requête envoyée à `localhost:3000` sera automatiquement envoyée au port 3001 du conteneur. 

Le flag `-m` permet de définir la limite de mémoire allouée à un conteneur. Le conteneur ne pourra en aucun cas avoir accès à plus de memoire que défini par le flag `-m`. De même, le flag `--cpus` défini le nombre de cpu cores disponibles pour le conteneur. 

Ces valeurs peuvent donc avoir un impact sur les performances de notre conteneur. 

### Q5 )

```
IMAGE          CREATED             CREATED BY                                      SIZE      COMMENT
e2e406240cd8   About an hour ago   CMD ["npm" "run" "start"]                       0B        buildkit.dockerfile.v0
<missing>      About an hour ago   EXPOSE [3000/tcp]                               0B        buildkit.dockerfile.v0
<missing>      About an hour ago   RUN /bin/sh -c npm run build # buildkit         34.7kB    buildkit.dockerfile.v0
<missing>      About an hour ago   RUN /bin/sh -c npm install # buildkit           98.2MB    buildkit.dockerfile.v0
<missing>      About an hour ago   RUN /bin/sh -c apk add --no-cache nodejs npm…   81.6MB    buildkit.dockerfile.v0
<missing>      About an hour ago   COPY package-lock.json /app/ # buildkit         395kB     buildkit.dockerfile.v0
<missing>      About an hour ago   COPY package.json /app/ # buildkit              1.68kB    buildkit.dockerfile.v0
<missing>      About an hour ago   COPY tsconfig.json /app/ # buildkit             579B      buildkit.dockerfile.v0
<missing>      About an hour ago   COPY src/ /app/src/ # buildkit                  1.67kB    buildkit.dockerfile.v0
<missing>      About an hour ago   WORKDIR /app                                    0B        buildkit.dockerfile.v0
<missing>      3 weeks ago         CMD ["/bin/sh"]                                 0B        buildkit.dockerfile.v0
<missing>      3 weeks ago         ADD alpine-minirootfs-3.22.2-x86_64.tar.gz /…   8.32MB    buildkit.dockerfile.v0
```

On peut voir l'historique des commandes passées par le conteneur, et surtout la taille des modifications aportées. On remarque donc que pour réduire la taille de l'image il faut travailler sur les opérations les plus couteuses, dans notre cas l'installation des *dependecies*. 

### Q6 )

Pour réduire au max la taille j'ai fait un build *multi-stage* et je ne copie que les dépendances de production (via la commande `npm ci` pour *clean install*).

### Q7 ) 

L'image est publiée sur dockerHub : https://hub.docker.com/repository/docker/pallandos/mini-monitoring/general

### Q8 ) 

On peut directement *pull* depuis le dépot DockerHub et run avec la commande :

    docker run -p 3000:3000 -d pallandos/mini-monitoring:light

## TD3

### Q3 )

On peut voir dans l'onglet "actions" du dépôt tous les runs des workflows. 

### Q4 )

En effet, écrire les jeux de test est très important car en intégration continue il permet de s'assurer que chaque *commit* ne fait pas régresser la *codebase* : c'est à dire on peut savoir tout de suite si une modification introduit des bugs ou non. 

