# Rapport et réponses aux questions 

## TD1

### q1 ) 

Le dépôt et les codes sont trouvables [ici](https://github.com/Pallandos/mini-monitoring).

### q2 )

Le fichier `package.json` défini toutes les commandes que l'on peut lancer avec `node`, le nom du package, les emplacements des binaires etc. Je l'ai un petit peu modifié pour changer le nom du module par exemple. Ce fichier défini aussi les **dependencies** (que l'on installe avec `npm`). 

Le ficheir `package-lock.json` est généré automatiquement lui, et défini les dépendances des dépendances. Lors de l'installation via `npm` par l'utilisateur, `npm` va regarder si ce paquet dépend d'autres *dependencies*, et cela est inscrit dans le `package-lock.json`, ce qui évite de le refaire plus tard.

### q3 )

Lorsque j'installe `systeminformation` cela ajoute ce package comme *dependecie* dnas `package.json`. La principale différence entre *dependencies* et *devDependencies* est que uniquement les premières sont **nécessaires** au fonctionement en production (installées par `nmp install`) alors que les autres seront ignorées dans un environement de production (`npm install --production` les ignore).

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