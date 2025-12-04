#!/usr/local/bin/python3

from enum import Enum


class Atoms(Enum):
    H = 22
    He = 13112221133211322112211213322112
    Li = 312211322212221121123222112
    Be = 111312211312113221133211322112211213322112
    B = 1321132122211322212221121123222112
    C = 3113112211322112211213322112
    N = 111312212221121123222112
    O = 132112211213322112
    F = 31121123222112
    Ne = 111213322112
    Na = 123222112
    Mg = 3113322112
    Al = 1113222112
    Si = 1322112
    P = 311311222112
    S = 1113122112
    Cl = 132112
    Ar = 3112
    K = 1112
    Ca = 12
    Sc = 3113112221133112
    Ti = 11131221131112
    V = 13211312
    Cr = 31132
    Mn = 111311222112
    Fe = 13122112
    Co = 32112
    Ni = 11133112
    Cu = 131112
    Zn = 312
    Ga = 13221133122211332
    Ge = 31131122211311122113222
    As = 11131221131211322113322112
    Se = 13211321222113222112
    Br = 3113112211322112
    Kr = 11131221222112
    Rb = 1321122112
    Sr = 3112112
    Y = 1112133
    Zr = 12322211331222113112211
    Nb = 1113122113322113111221131221
    Mo = 13211322211312113211
    Tc = 311322113212221
    Ru = 132211331222113112211
    Rh = 311311222113111221131221
    Pd = 111312211312113211
    Ag = 132113212221
    Cd = 3113112211
    In = 11131221
    Sn = 13211
    Sb = 3112221
    Te = 1322113312211
    I = 311311222113111221
    Xe = 11131221131211
    Cs = 13211321
    Ba = 311311
    La = 11131
    Ce = 1321133112
    Pr = 31131112
    Nd = 111312
    Pm = 132
    Sm = 311332
    Eu = 1113222
    Gd = 13221133112
    Tb = 3113112221131112
    Dy = 111312211312
    Ho = 1321132
    Er = 311311222
    Tm = 11131221133112
    Yb = 1321131112
    Lu = 311312
    Hf = 11132
    Ta = 13112221133211322112211213322113
    W = 312211322212221121123222113
    Re = 111312211312113221133211322112211213322113
    Os = 1321132122211322212221121123222113
    Ir = 3113112211322112211213322113
    Pt = 111312212221121123222113
    Au = 132112211213322113
    Hg = 31121123222113
    Tl = 111213322113
    Pb = 123222113
    Bi = 3113322113
    Po = 1113222113
    At = 1322113
    Rn = 311311222113
    Fr = 1113122113
    Ra = 132113
    Ac = 3113
    Th = 1113
    Pa = 13
    U = 3


evolves = {
    Atoms.H: [Atoms.H],
    Atoms.He: [Atoms.Hf, Atoms.Pa, Atoms.H, Atoms.Ca, Atoms.Li],
    Atoms.Li: [Atoms.He],
    Atoms.Be: [Atoms.Ge, Atoms.Ca, Atoms.Li],
    Atoms.B: [Atoms.Be],
    Atoms.C: [Atoms.B],
    Atoms.N: [Atoms.C],
    Atoms.O: [Atoms.N],
    Atoms.F: [Atoms.O],
    Atoms.Ne: [Atoms.F],
    Atoms.Na: [Atoms.Ne],
    Atoms.Mg: [Atoms.Pm, Atoms.Na],
    Atoms.Al: [Atoms.Mg],
    Atoms.Si: [Atoms.Al],
    Atoms.P: [Atoms.Ho, Atoms.Si],
    Atoms.S: [Atoms.P],
    Atoms.Cl: [Atoms.S],
    Atoms.Ar: [Atoms.Cl],
    Atoms.K: [Atoms.Ar],
    Atoms.Ca: [Atoms.K],
    Atoms.Sc: [Atoms.Ho, Atoms.Pa, Atoms.H, Atoms.Ca, Atoms.Co],
    Atoms.Ti: [Atoms.Sc],
    Atoms.V: [Atoms.Ti],
    Atoms.Cr: [Atoms.V],
    Atoms.Mn: [Atoms.Cr, Atoms.Si],
    Atoms.Fe: [Atoms.Mn],
    Atoms.Co: [Atoms.Fe],
    Atoms.Ni: [Atoms.Zn, Atoms.Co],
    Atoms.Cu: [Atoms.Ni],
    Atoms.Zn: [Atoms.Cu],
    Atoms.Ga: [Atoms.Eu, Atoms.Ca, Atoms.Ac, Atoms.H, Atoms.Ca, Atoms.Zn],
    Atoms.Ge: [Atoms.Ho, Atoms.Ga],
    Atoms.As: [Atoms.Ge, Atoms.Na],
    Atoms.Se: [Atoms.As],
    Atoms.Br: [Atoms.Se],
    Atoms.Kr: [Atoms.Br],
    Atoms.Rb: [Atoms.Kr],
    Atoms.Sr: [Atoms.Rb],
    Atoms.Y: [Atoms.Sr, Atoms.U],
    Atoms.Zr: [Atoms.Y, Atoms.H, Atoms.Ca, Atoms.Tc],
    Atoms.Nb: [Atoms.Er, Atoms.Zr],
    Atoms.Mo: [Atoms.Nb],
    Atoms.Tc: [Atoms.Mo],
    Atoms.Ru: [Atoms.Eu, Atoms.Ca, Atoms.Tc],
    Atoms.Rh: [Atoms.Ho, Atoms.Ru],
    Atoms.Pd: [Atoms.Rh],
    Atoms.Ag: [Atoms.Pd],
    Atoms.Cd: [Atoms.Ag],
    Atoms.In: [Atoms.Cd],
    Atoms.Sn: [Atoms.In],
    Atoms.Sb: [Atoms.Pm, Atoms.Sn],
    Atoms.Te: [Atoms.Eu, Atoms.Ca, Atoms.Sb],
    Atoms.I: [Atoms.Ho, Atoms.Te],
    Atoms.Xe: [Atoms.I],
    Atoms.Cs: [Atoms.Xe],
    Atoms.Ba: [Atoms.Cs],
    Atoms.La: [Atoms.Ba],
    Atoms.Ce: [Atoms.La, Atoms.H, Atoms.Ca, Atoms.Co],
    Atoms.Pr: [Atoms.Ce],
    Atoms.Nd: [Atoms.Pr],
    Atoms.Pm: [Atoms.Nd],
    Atoms.Sm: [Atoms.Pm, Atoms.Ca, Atoms.Zn],
    Atoms.Eu: [Atoms.Sm],
    Atoms.Gd: [Atoms.Eu, Atoms.Ca, Atoms.Co],
    Atoms.Tb: [Atoms.Ho, Atoms.Gd],
    Atoms.Dy: [Atoms.Tb],
    Atoms.Ho: [Atoms.Dy],
    Atoms.Er: [Atoms.Ho, Atoms.Pm],
    Atoms.Tm: [Atoms.Er, Atoms.Ca, Atoms.Co],
    Atoms.Yb: [Atoms.Tm],
    Atoms.Lu: [Atoms.Yb],
    Atoms.Hf: [Atoms.Lu],
    Atoms.Ta: [Atoms.Hf, Atoms.Pa, Atoms.H, Atoms.Ca, Atoms.W],
    Atoms.W: [Atoms.Ta],
    Atoms.Re: [Atoms.Ge, Atoms.Ca, Atoms.W],
    Atoms.Os: [Atoms.Re],
    Atoms.Ir: [Atoms.Os],
    Atoms.Pt: [Atoms.Ir],
    Atoms.Au: [Atoms.Pt],
    Atoms.Hg: [Atoms.Au],
    Atoms.Tl: [Atoms.Hg],
    Atoms.Pb: [Atoms.Tl],
    Atoms.Bi: [Atoms.Pm, Atoms.Pb],
    Atoms.Po: [Atoms.Bi],
    Atoms.At: [Atoms.Po],
    Atoms.Rn: [Atoms.Ho, Atoms.At],
    Atoms.Fr: [Atoms.Rn],
    Atoms.Ra: [Atoms.Fr],
    Atoms.Ac: [Atoms.Ra],
    Atoms.Th: [Atoms.Ac],
    Atoms.Pa: [Atoms.Th],
    Atoms.U: [Atoms.Pa],
}


def say(input):
    return [atom for a in input for atom in evolves[a]]


def say_multiple(input, times):
    for _ in range(times):
        input = say(input)

    return input


def length(atoms):
    return sum(len(str(a.value)) for a in atoms)


def main():
    with open("../files/2015_10_input.txt") as f:
        input = [Atoms(int(f.read()))]

    # part1
    output = say_multiple(input, 40)
    print(length(output))

    # part2
    print(length(say_multiple(output, 10)))


if __name__ == "__main__":
    main()
