<template>
    <div class="container add-smoothie">
        <h2 class="center-align indigo-text">Novo smoothie</h2>
        <form @submit.prevent="add()">
            <div class="field title">
                <label for="title">Nome</label>
                <input type="text" name="title" v-model="title" id="title">
            </div>
            <div v-for="(ingredient, index) in ingredients" :key="index" class="field">
                <label for="ingredient">Ingredientes</label>
                <input type="text" id="ingrediente" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ingredient)">delete</i>
            </div>
             <div class="field add-ingredient">
                <label for="add-ingredient">Adicione um ingrediente</label>
                <input type="text" name="add-ingredient" id="add-ingredient" @keydown.tab.prevent="addIngredient()" v-model="another">
            </div>
            <div class="field center-align">
                <p class="red-text" v-if="feedback">{{ feedback }}</p>
                <button class="btn pink">Salvar</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'AddSmoothie',
    data() {
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null
        }
    },
    methods: {
        add() {
            if (this.title) {
                this.feedback = null
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                db.collection('smoothies').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
                })
                .then(() => {
                    this.$router.push({name: 'Index'})
                })
                .catch(err => console.log(err))
            } else {
                this.feedback = 'Preencha o nome do smoothie'
            }
        },
        addIngredient() {
            if (this.another) {
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = 'Você deve adicionar um ingrediente'
            }
        },
        deleteIng(ing) {
            this.ingredients = this.ingredients.filter(el => {
                return el != ing
            })
        }
    }
}
</script>

<style>
.add-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}

.add-smoothie h2 {
    font-size: 2em;
    margin: 20px auto;
}

.add-smoothie .field {
    margin: 20px auto;
    position: relative;
}

.add-smoothie .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>


